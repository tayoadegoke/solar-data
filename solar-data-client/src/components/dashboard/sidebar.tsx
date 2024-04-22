import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import AssessmentIcon from '@mui/icons-material/Assessment';
import MonitorIcon from '@mui/icons-material/Monitor';
import ConstructionIcon from '@mui/icons-material/Construction';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { customColors } from '@/styles/custom-theme';
import { useTranslation } from 'next-i18next';
import { capitalizeFirstLetter } from '@/utils/utils';


interface Props { }

function Sidebar(props: Props) {
    const { } = props
    const { t } = useTranslation()

    const menuItems = [
        {
            title: capitalizeFirstLetter(t('headerMenu.assesment').toLowerCase()),
            icon: <AssessmentIcon />
        },
        {
            title: capitalizeFirstLetter(t('headerMenu.monitor').toLowerCase()),
            icon: <MonitorIcon />
        },
        {
            title: capitalizeFirstLetter(t('headerMenu.optimize').toLowerCase()),
            icon: <ConstructionIcon />
        },
        {
            title: capitalizeFirstLetter(t('headerMenu.editUser').toLowerCase()),
            icon: <SettingsIcon />
        },
        {
            title: capitalizeFirstLetter(t('headerMenu.buyPackages').toLowerCase()),
            icon: <ShoppingCartIcon />
        }
    ]

    return (
        <Box sx={{
            width: '250px', backgroundColor: customColors.grey, boxShadow: '2px 5px 10px 0px rgba(0, 0, 0, 0.5)', display: 'flex',
            flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', paddingTop: '1.5em', minHeight: '100%'

        }}>

            {menuItems.map((item) => {
                return (
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        paddingBottom: '2em',
                        cursor: 'pointer',
                        width: '100%',
                        '&:hover': {
                            color: customColors.secondary
                        }
                    }}
                        key={item.title}
                    >
                        <Typography pr={2} pl={2}>{item.icon}</Typography > <Typography>{item.title}</Typography>
                    </Box>
                )
            })}


        </Box>
    )
}

export default Sidebar
