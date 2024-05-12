import React, { useState, useEffect } from 'react'
import { Box, Stepper, Step, StepLabel } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import Modules from '../modules/modules'
import StepControls from './step-controls'
import { useModulesQuery } from '@/data/assessment/assessment.queries'


interface Props { }

function SystemDetails(props: Props) {
    const { } = props
    const [activeStep, setActiveStep] = useState(1)
    const modulesLoaded = useModulesQuery(undefined).isFetched




    const steps = [
        'Location',
        'Modules',
        'Inverters',
        'System Design',
        'Shading and Losses'
    ];

    return (
        <Box sx={{ height: '100%', minHeight: '100vh', width: '100%', marginTop: '1em' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {activeStep == 1 &&
                <Modules />
            }
            {/* {activeStep == 2 &&
            //
            } */}
            {modulesLoaded &&
                <StepControls setActiveStep={setActiveStep} activeStep={activeStep} />
            }

        </Box>
    )
}

export default SystemDetails