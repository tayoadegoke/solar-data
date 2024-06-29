import React, { useState } from 'react'
import { Box, Typography, } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Image from 'next/image';
import LoginForm from './login-form';
import RegisterForm from './register-form';

type PageState = 'login' | 'register'
export interface AuthFormProps {
    setPageState: (pageState: PageState) => void
}

function Auth() {
    const [pageState, setPageState] = useState<PageState>('login')
    const session = useSession()
    const router = useRouter()

    session.status === 'authenticated' && router.push('/locations')

    return (
        session.status === 'unauthenticated' &&

        <Box textAlign={'center'} my={6}>
            <Image src="/solar-data-colored-logo.png" width={207} alt='solar data logo' height={160} priority />
            {pageState === 'login' ?
                <LoginForm setPageState={setPageState} />
                :
                <RegisterForm setPageState={setPageState} />
            }

        </Box>
    )
}

export default Auth
