import React from 'react'
import DashboardContainer from '@/components/dashboard/dashboard-container'
import Locations from '@/components/dashboard/assessment/locations'

interface Props { }

function LocationsIndex(props: Props) {
    const { } = props

    return (
        <DashboardContainer>
            <Locations />
        </DashboardContainer>

    )
}

export default LocationsIndex
