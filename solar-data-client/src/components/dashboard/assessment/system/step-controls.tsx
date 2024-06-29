import React from 'react'
import { useRouter } from 'next/router';
import { Box } from "@mui/material"
import { useFormikContext } from "formik"
import SaveIcon from '@mui/icons-material/Save';
import SdButton from '@/components/ui/SdButton'
import { locationKeys, updateSystem } from '@/data/assessment/assessment.queries';
import { useToast } from '@/utils/hooks/useToast';
import { useQueryClient } from '@tanstack/react-query';


interface Props {
    activeStep: number
    setActiveStep: (num: number) => void
}

function StepControls(props: Props) {
    const { setActiveStep, activeStep } = props
    const router = useRouter()
    const { showToast } = useToast()
    const queryClient = useQueryClient()
    const { initialValues, values, submitForm } = useFormikContext();

    const handleNextClick = () => {
        if (activeStep < 4)
            setActiveStep((activeStep + 1))
    }

    const handlePrevClick = () => {
        if (activeStep > 1)
            setActiveStep((activeStep - 1))

    }

    const isSaveDisabled = () => {
        return (values as any).module_id < 1
    }


    const handleSave = async () => {
        try {
            await updateSystem(values, router.query?.id as string)
            showToast('success', 'System updated successfully')
            queryClient.invalidateQueries({ queryKey: locationKeys.all })
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
