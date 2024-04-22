import React from 'react'
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik'
import { useTranslation } from "next-i18next";
import { Typography } from '@mui/material';
import * as Yup from 'yup'
import axios from 'axios';
import { capitalizeFirstLetter } from '@/utils/utils';
import { customColors } from '@/styles/custom-theme';


import SdTextField from '../ui/SdTextField';
import SdButton from '../ui/SdButton';
import { AuthFormProps } from './auth';
import { signIn, useSession } from 'next-auth/react';


function LoginForm(props: AuthFormProps) {
    const { setPageState } = props
    const { t } = useTranslation()


    const LoginSchema = Yup.object().shape({
        email: Yup.string().email(t('errorMsg.emailNotValid')).required(t('errorMsg.emailRequired')),
        password: Yup.string().required(t('errorMsg.passwordIsRequired')),
    });

    return (
        <>
            <Typography variant='h5' mt={4}>{capitalizeFirstLetter(t('headerMenu.login').toLowerCase())}</Typography>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(async () => {
                        const result = await signIn('credentials', {
                            email: values.email,
                            password: values.password,
                            redirect: false
                        })
                        setSubmitting(false);
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
                    <Form onSubmit={handleSubmit} style={{ flexDirection: 'column', justifyContent: 'space-between', display: 'flex', width: '320px', margin: '1em auto', minHeight: '20vh', }}>
                        <SdTextField label={t('labels.email')} required name='email' />
                        <SdTextField label={t('labels.password')} required name='password' />
                        <SdButton variant='contained' type='submit'>{t('labels.submit')}</SdButton>
                    </Form>
                )}
            </Formik>
            <Typography variant='body2'>Don't have an account yet? <span style={{ cursor: 'pointer', color: customColors.secondary }} onClick={() => setPageState('register')}>{capitalizeFirstLetter(t('headerMenu.register').toLowerCase())}</span></Typography>
        </>
    )
}

export default LoginForm
