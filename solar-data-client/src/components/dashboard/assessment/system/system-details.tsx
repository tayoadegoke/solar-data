import React from 'react'
import { Box, Stepper, Step, StepLabel } from '@mui/material'
import Modules from '../modules/modules'


interface Props { }

function SystemDetails(props: Props) {
    const { } = props
    const steps = [
        'Location',
        'Modules',
        'Inverters',
        'System Design',
        'Shading and Losses'
    ];

    return (
        <Box sx={{ height: '100%', minHeight: '100vh', width: '100%', marginTop: '1em' }}>
            <Stepper activeStep={1} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Modules />

        </Box>
    )
}

export default SystemDetails