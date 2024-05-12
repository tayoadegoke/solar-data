import React from 'react'
import { Box } from "@mui/material"
import SaveIcon from '@mui/icons-material/Save';
import SdButton from '@/components/ui/SdButton'

interface Props {
    activeStep: number
    setActiveStep: (num: number) => void
}

function StepControls(props: Props) {
    const { setActiveStep, activeStep } = props

    const handleNextClick = () => {
        setActiveStep((activeStep + 1))
    }

    const handlePrevClick = () => {
        setActiveStep((activeStep - 1))
    }

    return (
        <Box sx={{ margin: '2em' }} display='flex' justifyContent='space-between'>
            <Box>
                <SdButton variant='contained' onClick={handlePrevClick}>{'< Previous'}</SdButton>
            </Box>

            <Box display='flex' gap={1}>
                <SdButton variant='contained'><SaveIcon />Save</SdButton>
                <SdButton variant='contained' onClick={handleNextClick}>{'> Next'}</SdButton>
            </Box>

        </Box>
    )
}

export default StepControls
