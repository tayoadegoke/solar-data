import React, { ReactNode, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Skeleton } from '@mui/material'
import { axiosServerInstance, axiosBffInstance } from '@/data/common'

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
    const session = useSession() as unknown as { data: { accessToken?: string }, status: string }
    const router = useRouter()
    const currentPath = router.pathname

    const unprotectedRoutes = ['/']


    useEffect(() => {
        if (session?.data?.accessToken)
            axiosBffInstance.interceptors.request.use(async function (req) {
                req.headers.Authorization = `Bearer ${session?.data?.accessToken}`
                // delete session.data.accessToken
                return req;
            }, function (error) {
                console.log({ error })

                return Promise.reject(error);
            })
    }, [session])



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
