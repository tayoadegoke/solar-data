import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import { Box, Stepper, Step, StepLabel } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import Modules from '../modules/modules'
import StepControls from './step-controls'
import { useModulesQuery } from '@/data/assessment/assessment.queries'
import Inverters from '../inverters/inverters'


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
            <Formik
                initialValues={{ location_id: '', module_id: null, inverter_id: null }}
                // validationSchema={LoginSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(async () => {
                        // const result = await signIn('credentials', {
                        //     email: values.email,
                        //     password: values.password,
                        //     redirect: false
                        // })
                        setSubmitting(false);
                        console.log('submitting')
                    }, 400);

                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <Form onSubmit={handleSubmit}>
                        {activeStep == 1 &&
                            <Modules />
                        }
                        {activeStep == 2 &&
                            <Inverters />
                        }

                        {modulesLoaded &&
                            <StepControls setActiveStep={setActiveStep} activeStep={activeStep} />
                        }

                    </Form>
                )}
            </Formik>
        </Box>
    )
}

export default SystemDetails