import React from 'react'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import SdTable from '@/components/ui/SdTable'
import SdSpinner from '@/components/ui/SdSpinner'
import { GridRowParams } from '@mui/x-data-grid'
import { capitalizeFirstLetter } from '@/utils/utils'
import { useTranslation } from 'react-i18next'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { useSystemsQuery } from '@/data/assessment/assessment.queries'
import { useSession } from 'next-auth/react'

interface Props {
    location_id: number
}

function SystemList(props: Props) {
    const { location_id } = props
    const router = useRouter()
    const session = useSession()
    const isAuthenticated = session.status === 'authenticated' ? true : false
    const { data, isLoading } = useSystemsQuery(location_id)
    const { t } = useTranslation()

    let transformedData: any = []

    if (data) {
        data.map((sys) => {
            transformedData.push({
                id: 1,
                module: sys.module_name,
                inverters: sys.inverter_name,
                no_of_inverters: sys.inverter_count,
                // system_actions: 'Edit'
            })
        })
    }

    const colProps = [
        {
            field: 'module',
            headerName: t('labels.modules'),
        },
        { field: 'inverters', headerName: t('labels.inverters'), renderCell: (param: GridRenderCellParams) => param.formattedValue },
        { field: 'no_of_inverters', headerName: t('labels.numberOfInverters'), renderCell: (param: GridRenderCellParams) => param.formattedValue },
        // {
        //     field: 'system_actions', headerName: t('labels.systemActions'), renderCell: (param: GridRenderCellParams) => param.formattedValue

        // },

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
                <SdTable colProps={colProps} rowProps={transformedData} rowClickFn={rowClickFn} />

    )
}

export default SystemList
