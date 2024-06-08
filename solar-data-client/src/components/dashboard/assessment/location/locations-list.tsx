import React, { useState } from 'react'
import { Typography, Box } from '@mui/material'
import { useRouter } from 'next/router'
import SdTable from '@/components/ui/SdTable'
import SdSpinner from '@/components/ui/SdSpinner'
import { GridRowParams } from '@mui/x-data-grid'
import { capitalizeFirstLetter } from '@/utils/utils'
import { useTranslation } from 'react-i18next'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { useLocationsQuery } from '@/data/assessment/assessment.queries'
import { useSession } from 'next-auth/react'
import SystemList from '../system/system-list'

interface Props { }

function LocationsList(props: Props) {
    const { } = props
    const router = useRouter()
    const session = useSession()
    const isAuthenticated = session.status === 'authenticated' ? true : false
    const { data, isLoading, error } = useLocationsQuery(isAuthenticated)
    const { t } = useTranslation()
    const [showSystems, setShowSystems] = useState(false)
    const [location_id, setLocationId] = useState(0)

    console.log({ session })
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
        setLocationId(Number(row.id))
        setShowSystems(true)
    }
    console.log({ data, error })

    return (
        isLoading || !data ?
            < SdSpinner />
            :
            data && data.length === 0 ?
                <Typography>You have not added any locations yet, click Add Location to add a location.</Typography>
                :
                <>
                    <Typography>{t('titles.locations')}</Typography>
                    <SdTable colProps={colProps} rowProps={data} rowClickFn={rowClickFn} />

                    {showSystems &&
                        <Box mt={4}>
                            <Typography>{t('titles.systems')}</Typography>
                            <SystemList location_id={location_id} />
                        </Box>

                    }
                </>


    )
}

export default LocationsList
