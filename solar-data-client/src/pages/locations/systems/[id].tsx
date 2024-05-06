import React from 'react'
import DashboardContainer from '@/components/dashboard/dashboard-container'
import SystemDetails from '@/components/dashboard/assessment/system/system-details'

interface Props { }

function SystemDetailsPage(props: Props) {
    const { } = props

    return (
        <DashboardContainer>
            <SystemDetails />
        </DashboardContainer>
    )
}

export default SystemDetailsPage