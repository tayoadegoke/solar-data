import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import SdTable from '@/components/ui/SdTable'
import SdSpinner from '@/components/ui/SdSpinner'
import { GridRowParams } from '@mui/x-data-grid'
import { capitalizeFirstLetter } from '@/utils/utils'
import { useTranslation } from 'react-i18next'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { useLocationsQuery } from '@/data/assessment/assessment.queries'

interface Props { }

function LocationsList(props: Props) {
    const { } = props
    const router = useRouter()
    const { data, isLoading } = useLocationsQuery()
    const { t } = useTranslation()

    const colProps = [
        {
            field: 'ghi',
            headerName: t('labels.ghi'),
        },
        { field: 'name', headerName: t('labels.name'), renderCell: (param: GridRenderCellParams) => capitalizeFirstLetter(param.formattedValue) },
        { field: 'area', headerName: t('labels.area'), renderCell: (param: GridRenderCellParams) => Number.parseFloat(param.formattedValue).toFixed(2) },
        {
            field: 'is_active', headerName: t('labels.activeLocation'), renderCell: (param: GridRenderCellParams) => param.formattedValue ? t('labels.active') : t('labels.inactive')

        },

    ]

    const rowClickFn = (row: GridRowParams) => {
        router.push(`/locations/${row.id}`)

    }

    { console.log(data) }

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

export default LocationsList
