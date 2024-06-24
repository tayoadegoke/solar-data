import React from 'react'
import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import SdTable from '@/components/ui/SdTable'
import SdSpinner from '@/components/ui/SdSpinner'
import { GridRowParams } from '@mui/x-data-grid'
import { capitalizeFirstLetter } from '@/utils/utils'
import { useTranslation } from 'react-i18next'
import { GridRenderCellParams } from '@mui/x-data-grid'
import { useInvertersQuery } from '@/data/assessment/assessment.queries'
import { useSession } from 'next-auth/react'
import { useFormikContext } from 'formik'


interface Props {
    setInverterId: (inverterId: string | null) => void
}

function ModulesList(props: Props) {
    const { setInverterId } = props
    const router = useRouter()
    const session = useSession()
    const isAuthenticated = session.status === 'authenticated' ? true : false
    const { data, isLoading, } = useInvertersQuery(isAuthenticated)
    const { setFieldValue, values } = useFormikContext()
    const { t } = useTranslation()


    const colProps = [
        {
            field: 'name',
            headerName: t('labels.name'),
        },
        { field: 'inv_snl_eff_cec', headerName: t('labels.cecEfficiency'), renderCell: (param: GridRenderCellParams) => Number(param.formattedValue).toFixed(3) },
        { field: 'inv_snl_eff_euro', headerName: t('labels.europeanEfficiency'), renderCell: (param: GridRenderCellParams) => Number(param.formattedValue).toFixed(3) },
        { field: 'inv_snl_paco', headerName: t('labels.maximumACPower') },
        { field: 'inv_snl_pdco', headerName: t('labels.maximumDcPower'), renderCell: (param: GridRenderCellParams) => Number(param.formattedValue).toFixed(3) },
        { field: 'inv_snl_pso', headerName: t('labels.operatingPowerConsumption'), renderCell: (param: GridRenderCellParams) => Number(param.formattedValue).toFixed(3) },
        { field: 'inv_snl_pnt', headerName: t('labels.nightPowerConsumption'), renderCell: (param: GridRenderCellParams) => Number(param.formattedValue).toFixed(3) },
        { field: 'mppt_low_inverter', headerName: t('labels.minimumMpptDcVoltage') },
        { field: 'inv_snl_vdco', headerName: t('labels.nominalDcVoltage') },
        { field: 'mppt_hi_inverter', headerName: t('labels.maximumMpptDcVoltage') },

    ]

    const rowClickFn = (row: GridRowParams) => {

        setInverterId(row.id as string)
        setFieldValue('inverter_id', row.id)
        setFieldValue('step', 3)
        console.log(values)
    }

    return (
        isLoading || !data ?
            < SdSpinner />
            :
            data && (data.length > 0) &&
            <SdTable colProps={colProps} rowProps={data} rowClickFn={rowClickFn} />

    )
}


export default ModulesList