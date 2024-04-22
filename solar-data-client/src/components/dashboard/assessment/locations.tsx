import React from 'react'
import SdTabs from '@/components/ui/SdTabs'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { useTabs } from '@/utils/hooks/useTabs'
import LocationMap from './map'
import LocationsList from './locations-list'

interface Props { }
export type TabValueProps = 'LOCATIONS' | 'ADD LOCATION'

function Locations(props: Props) {
    const { } = props
    const { t } = useTranslation()
    const { activeTab, changeTab } = useTabs<TabValueProps>()

    return (

        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', margin: '1em', height: '100%', minHeight: '100vh' }}>


            <SdTabs tabs={[t('headerMenu.locations'), t('sidebarMenu.addLocation')]} />
            {activeTab === t('sidebarMenu.addLocation') ?

                <LocationMap changeTab={changeTab} />
                : <LocationsList />}

        </Box>


    )
}

export default Locations
