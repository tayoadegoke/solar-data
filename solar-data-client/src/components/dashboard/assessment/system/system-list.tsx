import React, { useEffect } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import SdTable from '@/components/ui/SdTable'
import SdSpinner from '@/components/ui/SdSpinner'
import { useToast } from '@/utils/hooks/useToast'
import { GridRowParams } from '@mui/x-data-grid'
import { useTranslation } from 'react-i18next'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { createSystem, useSystemsQuery } from '@/data/assessment/assessment.queries'


interface Props {
    location_id: number
}

function SystemList(props: Props) {
    const { location_id, } = props
    const router = useRouter()
    const toast = useToast()
    const { data, isLoading } = useSystemsQuery(location_id)
    const { t } = useTranslation()

    let transformedData: any = []

    if (data) {
        data.map((sys: any) => {
            transformedData.push({
                id: sys.id,
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

    const rowClickFn = async (row: GridRowParams) => {
        router.push(`/locations/systems/${row.id}?location_id=${location_id}`)

    }

    const addSystem = async () => {
        try {
            const data = await createSystem({
                location_id
            })

            toast.showToast('success', 'system created')
            router.push(`/locations/systems/${data[0].id}?location_id=${location_id}`)
        } catch (e) {
            toast.showToast('error', 'Could not create system')
        }

    }

    useEffect(() => {

    }, [location_id])

    return (
        isLoading || !data ?
            < SdSpinner />
            :
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
                {data && data.length === 0 ?
                    <Typography mt={4} variant='body2'>You have not added any systems yet, click Add System to add a system.</Typography>
                    :


                    <SdTable colProps={colProps} rowProps={transformedData} rowClickFn={rowClickFn} />
                }
                <Button variant='contained' style={{ marginTop: '1em', alignSelf: "flex-end" }} onClick={() => addSystem()}>{t('labels.addNewSystem')}</Button>
            </Box>


    )
}

export default SystemList
