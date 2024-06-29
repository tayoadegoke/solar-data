import React, { ReactNode, useEffect } from 'react'
import Sidebar from '@/components/dashboard/sidebar'
import { Box } from '@mui/material'
import { TabProvider } from '@/utils/hooks/useTabs'
import useSdMediaQuery from '@/utils/hooks/useMediaQuery'

interface Props {
    children: ReactNode
}

function DashboardContainer(props: Props) {
    const { children } = props
    const { xs } = useSdMediaQuery()

    useEffect(() => {
        //to access parent div
        document.getElementById('top-div')?.parentElement?.style.setProperty('height', '100%')
        document.getElementById('top-div')?.parentElement?.style.setProperty('min-height', '100vh')
    })

    return (

        <Box style={{ display: 'flex', minHeight: 'max-content', alignItems: 'stretch', }} id={'top-div'}>
            <Sidebar />
            <TabProvider>
                {children}
            </TabProvider>

        </Box>



    )
}

export default DashboardContainer
