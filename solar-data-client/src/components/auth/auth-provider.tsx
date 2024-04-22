import React, { ReactNode } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Skeleton } from '@mui/material'

interface Props {
    children: ReactNode
}


function AuthRedirect() {
    const router = useRouter()
    router.push('/')
    return <></>
}

function AuthProvider(props: Props) {
    const { children } = props
    const session = useSession()
    const router = useRouter()
    const currentPath = router.pathname

    const unprotectedRoutes = ['/']

    return (
        <div>
            {session.status === 'authenticated' || unprotectedRoutes.includes(currentPath) ?
                children
                :
                session.status === 'loading' ?
                    <Skeleton />
                    :
                    <AuthRedirect />

            }
        </div>
    )



}

export default AuthProvider
