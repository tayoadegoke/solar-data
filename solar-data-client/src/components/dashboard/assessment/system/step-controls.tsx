import React from 'react'
import { useRouter } from 'next/router';
import { Box } from "@mui/material"
import { useFormikContext } from "formik"
import SaveIcon from '@mui/icons-material/Save';
import SdButton from '@/components/ui/SdButton'
import { updateSystem } from '@/data/assessment/assessment.queries';
import { useToast } from '@/utils/hooks/useToast';


interface Props {
    activeStep: number
    setActiveStep: (num: number) => void
}

function StepControls(props: Props) {
    const { setActiveStep, activeStep } = props
    const router = useRouter()
    const { showToast } = useToast()
    const { initialValues, values, submitForm } = useFormikContext();

    console.log(router.query?.id)
    const handleNextClick = () => {
        if (activeStep < 4)
            setActiveStep((activeStep + 1))
    }

    const handlePrevClick = () => {
        if (activeStep > 1)
            setActiveStep((activeStep - 1))

    }

    const isSaveDisabled = () => {
        console.log({ values, initialValues })
        return values.module_id < 1
    }


    const handleSave = async () => {
        try {
            await updateSystem(values, router.query?.id as string)
            showToast('success', 'System updated successfully')
            router.push('/locations')
        } catch {
            showToast('error', 'Error updating system')
        }

    }

    return (
        <Box sx={{ margin: '2em' }} display='flex' justifyContent='space-between'>
            <Box>
                {activeStep > 1 &&
                    <SdButton variant='contained' onClick={handlePrevClick}>{'< Previous'}</SdButton>
                }
            </Box>

            <Box display='flex' gap={1}>
                <SdButton variant='contained' type='submit' disabled={isSaveDisabled()} onClick={handleSave}><SaveIcon />Save</SdButton>
                <SdButton variant='contained' onClick={handleNextClick}>{'> Next'}</SdButton>
            </Box>

        </Box>
    )
}

export default StepControls
