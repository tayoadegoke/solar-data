import React from 'react'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import SdTable from '@/components/ui/SdTable'
import SdSpinner from '@/components/ui/SdSpinner'
import { GridRowParams } from '@mui/x-data-grid'
import { capitalizeFirstLetter } from '@/utils/utils'
import { useTranslation } from 'react-i18next'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { useLocationsQuery } from '@/data/assessment/assessment.queries'
import { useSession } from 'next-auth/react'

interface Props { }

function SystemList(props: Props) {
    const { } = props
    const router = useRouter()
    const session = useSession()
    const isAuthenticated = session.status === 'authenticated' ? true : false
    const { data, isLoading } = useLocationsQuery(isAuthenticated)
    const { t } = useTranslation()


    const colProps = [
        {
            field: 'module',
            headerName: t('labels.modules'),
        },
        { field: 'inverters', headerName: t('labels.inverters'), renderCell: (param: GridRenderCellParams) => capitalizeFirstLetter(param.formattedValue) },
        { field: 'no_of_inverters', headerName: t('labels.numberOfInverters'), renderCell: (param: GridRenderCellParams) => Number.parseFloat(param.formattedValue).toFixed(2) },
        {
            field: 'system_actios', headerName: t('labels.systemActions'), renderCell: (param: GridRenderCellParams) => param.formattedValue ? t('labels.active') : t('labels.inactive')

        },

    ]

    const rowClickFn = (row: GridRowParams) => {
        router.push(`/locations/systems/${row.id}`)

    }
    console.log({ data })

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

export default SystemList
