import React from 'react'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import SdTable from '@/components/ui/SdTable'
import SdSpinner from '@/components/ui/SdSpinner'
import { GridRowParams } from '@mui/x-data-grid'
import { capitalizeFirstLetter } from '@/utils/utils'
import { useTranslation } from 'react-i18next'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { useModulesQuery } from '@/data/assessment/assessment.queries'
import { useSession } from 'next-auth/react'


interface Props {
    setModuleId: (moduleId: string | null) => void
}

function ModulesList(props: Props) {
    const { setModuleId } = props
    const router = useRouter()
    const session = useSession()
    const isAuthenticated = session.status === 'authenticated' ? true : false
    const { data, isLoading } = useModulesQuery(isAuthenticated)
    const { t } = useTranslation()

    console.log({ session })
    const colProps = [
        {
            field: 'name',
            headerName: t('labels.name'),
        },
        { field: 'technology', headerName: t('labels.technology'), renderCell: (param: GridRenderCellParams) => param.formattedValue ? 'MultiSi' : 'MonoSi' },
        { field: 'cec_is_bifacial', headerName: t('labels.bifacial'), renderCell: (param: GridRenderCellParams) => param.formattedValue ? 'Yes' : 'No' },
        {
            field: 'cec_p_mp_ref', headerName: t('labels.maximumPower'), renderCell: (param: GridRenderCellParams) => param.formattedValue

        },
        {
            field: 'cec_gamma_r', headerName: t('labels.temperatureCoefficient'), renderCell: (param: GridRenderCellParams) => param.formattedValue

        },
        {
            field: 'cec_area', headerName: t('labels.moduleArea'), renderCell: (param: GridRenderCellParams) => param.formattedValue

        },

    ]

    const rowClickFn = (row: GridRowParams) => {

        setModuleId(row.id as string)
    }

    return (
        isLoading || !data ?
            < SdSpinner />
            :
            data && data.length === 0 ?
                <Typography>You have not added any locations yet, click Add Location to add a location.</Typography>
                :
                <SdTable colProps={colProps} rowProps={data} rowClickFn={rowClickFn} />

    )
}


export default ModulesList