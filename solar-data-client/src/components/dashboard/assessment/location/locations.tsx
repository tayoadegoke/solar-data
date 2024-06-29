import React, { useState } from 'react'
import SdTabs from '@/components/ui/SdTabs'
import { Box, TextField, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { useTabs } from '@/utils/hooks/useTabs'
import LocationMap from './map'
import LocationsList from './locations-list'
import MapSearch from './map-search'

interface Props { }
export type TabValueProps = 'LOCATIONS' | 'ADD LOCATION'

function Locations(props: Props) {
    const { } = props
    const { t } = useTranslation()
    const { activeTab, changeTab } = useTabs<TabValueProps>()
    const [mapCenter, setMapCenter] = useState<google.maps.LatLng | google.maps.LatLngLiteral | null | undefined>({ lat: 41.59, lng: 21.28 })

    return (

        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', margin: '1em', height: '100%', minHeight: '100vh' }}>


            <SdTabs tabs={[t('headerMenu.locations'), t('sidebarMenu.addLocation')]} />
            <Box >
                {activeTab === t('sidebarMenu.addLocation') ?

                    <Box sx={{ marginRight: '2em' }}>
                        <Typography ml={2} mb={1}>{t('labels.createLocation')}</Typography>
                        <MapSearch setMapCenter={setMapCenter} />
                        <LocationMap changeTab={changeTab} mapCenter={mapCenter} />
                    </Box>
                    : <LocationsList />}
            </Box>

        </Box>


    )
}

export default Locations
