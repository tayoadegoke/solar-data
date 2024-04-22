import React from 'react'
import { useRouter } from 'next/router';
import { Formik, Form } from 'formik'
import { useTranslation } from "next-i18next";
import { Typography, Box } from '@mui/material';
import SdTextField from '../ui/SdTextField';
import SdButton from '../ui/SdButton';


import { capitalizeFirstLetter } from '@/utils/utils';
import { customColors } from '@/styles/custom-theme';
import { AuthFormProps } from './auth';
import * as Yup from 'yup';
import CountryDropdown from '../ui/dropdowns/countryDropdown';
import { registerUser } from '@/data/auth/auth-queries';
import { signIn } from 'next-auth/react';


interface Props extends AuthFormProps {

}

function RegisterForm(props: Props) {
    const { setPageState } = props
    const { t } = useTranslation()
    const router = useRouter()

    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string().required(t('errorMsg.firstNameIsRequired')),
        lastName: Yup.string().required(t('errorMsg.lastNameIsRequired')),
        email: Yup.string().email(t('errorMsg.emailNotValid')).required(t('errorMsg.emailRequired')),
        password: Yup.string().min(8, t('errorMsg.passwordMustBeDinamicCharacters', { char: 8 })).required(t('errorMsg.passwordIsRequired')),
        country: Yup.string().required(t('errorMsg.countryRequired')),
        phoneNumber: Yup.number().required(t('errorMsg.phoneRequired'))
    });

    return (
        <Box>
            <Typography variant='h5' mt={4}>{capitalizeFirstLetter(t('headerMenu.register').toLowerCase())}</Typography>
            <Formik
                initialValues={{ email: '', password: '', firstName: '', lastName: '', country: '', phoneNumber: '' }}
                validationSchema={RegisterSchema}
                validateOnBlur
                onSubmit={async (values, { setSubmitting }) => {

                    const res = await registerUser(values)

                    res.status === 200 &&
                        await signIn('credentials', {
                            email: values.email,
                            password: values.password,
                            redirect: false
                        })

                    setSubmitting(false)
                }}
            >
                {({
                    isSubmitting,
                    handleSubmit,
                }) => (
                    <Form onSubmit={handleSubmit} style={{ flexDirection: 'column', justifyContent: 'space-between', display: 'flex', width: '320px', margin: '1em auto', minHeight: '55vh', height: 'auto' }}>
                        <SdTextField label={t('labels.firstname')} required name='firstName' />
                        <SdTextField label={t('labels.lastname')} required name='lastName' />
                        <SdTextField label={t('labels.email')} required name='email' />
                        <SdTextField label={t('labels.password')} required name='password' />
                        <CountryDropdown />
                        <SdTextField label={t('labels.phone')} required name='phoneNumber' />
                        <SdButton variant='contained' type={'submit'} disabled={isSubmitting}>{t('labels.submit')}</SdButton>
                    </Form>
                )}
            </Formik>
            <Typography variant='body2' mb={4}>Have an account yet already? <span style={{ cursor: 'pointer', color: customColors.secondary }} onClick={() => setPageState('login')}>{capitalizeFirstLetter(t('headerMenu.login').toLowerCase())}</span></Typography>
            <Box height={96}></Box>
        </Box>
    )
}

export default RegisterForm