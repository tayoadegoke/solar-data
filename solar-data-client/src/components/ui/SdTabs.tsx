import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import { useTabs } from '@/utils/hooks/useTabs';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


interface Props {
    tabs: string[]
}

function SdTabs(props: Props) {
    const { tabs } = props
    const { changeTab, activeTab } = useTabs()
    const [value, setValue] = React.useState(tabs.indexOf(activeTab as string));


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        changeTab(tabs[newValue])
    };

    useEffect(() => {
        if (!activeTab) changeTab(tabs[0])
        setValue(tabs.indexOf(activeTab as string))
    }, [activeTab])
    return (
        <Box sx={{ width: '100%', height: '100px' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} centered>
                    {tabs.map((tab, index) => {
                        return (
                            <Tab label={tab} {...a11yProps(index)} key={index} />
                        )

                    })}


                </Tabs>
            </Box>
        </Box>
    )
}

export default SdTabs
