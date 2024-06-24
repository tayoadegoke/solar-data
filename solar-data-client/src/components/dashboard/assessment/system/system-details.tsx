import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Formik, Form } from 'formik'
import { Box, Stepper, Step, StepLabel, Typography } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query'
import Modules from '../modules/modules'
import StepControls from './step-controls'
import { useModulesQuery, useSystemsByIdQuery } from '@/data/assessment/assessment.queries'
import Inverters from '../inverters/inverters'


interface Props { }

function SystemDetails(props: Props) {
    const { } = props
    const { location_id, id } = useRouter().query
    const { data, isLoading } = useSystemsByIdQuery(id as string, location_id as string)
    const [activeStep, setActiveStep] = useState(data?.[0].step > 0 ? data[0].step : 1)
    const modulesLoaded = useModulesQuery(undefined).isFetched


    const steps = [
        'Location',
        'Modules',
        'Inverters',
        'System Design',
        'Shading and Losses'
    ];

    useEffect(() => {
        if (!isLoading && data) {
            console.log(data[0], 'data system')
            setActiveStep(data?.[0].step > 0 ? data[0].step : 1)
        }

    }, [isLoading])
    return (
        !isLoading &&
        <Box sx={{ height: '100%', minHeight: '100vh', width: '100%', marginTop: '1em' }}>
            {!isLoading &&
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            }
            <Formik
                initialValues={{ location_id: data?.[0].location_id, module_id: data?.[0].module_id, inverter_id: data?.[0].inverter_id, step: data?.[0].step, }}
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
                        {activeStep > 2 &&
                            <Box sx={{ height: '300px', textAlign: 'center', marginTop: '3em' }}>
                                <Typography>Section not built</Typography>
                            </Box>
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