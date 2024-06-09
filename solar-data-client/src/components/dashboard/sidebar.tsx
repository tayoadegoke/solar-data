import React, { useState } from 'react'
import { useRouter } from 'next/router';
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
    const router = useRouter()


    const menuItems = [
        {
            title: capitalizeFirstLetter(t('headerMenu.assesment').toLowerCase()),
            icon: <AssessmentIcon />,
            route: 'locations'
        },
        {
            title: capitalizeFirstLetter(t('headerMenu.monitor').toLowerCase()),
            icon: <MonitorIcon />,
            route: 'monitor'
        },
        {
            title: capitalizeFirstLetter(t('headerMenu.optimize').toLowerCase()),
            icon: <ConstructionIcon />,
            route: 'optimize'
        },
        {
            title: capitalizeFirstLetter(t('headerMenu.editUser').toLowerCase()),
            icon: <SettingsIcon />,
            route: 'edit-user'
        },
        {
            title: capitalizeFirstLetter(t('headerMenu.buyPackages').toLowerCase()),
            icon: <ShoppingCartIcon />,
            route: 'packages'
        }
    ]

    const findActiveRoute = () => {
        const active = menuItems.find((menu) => (router.asPath.includes(menu.route)))
        return active?.title
    }

    const [active, setActive] = useState(findActiveRoute())


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
                        color: `${active === item.title ? customColors.secondary : ''}`,
                        '&:hover': {
                            color: `${active !== item.title ? customColors.primaryContrast : customColors.secondary}`,

                        }
                    }}
                        key={item.route}
                        onClick={() => {
                            console.log(active, item.title)
                            setActive(item.title)
                            if (active !== item.title || router.asPath !== `/${item.route}`) router.push(`/${item.route}`)
                        }}
                    >
                        <Typography pr={2} pl={2}>{item.icon}</Typography > <Typography>{item.title}</Typography>
                    </Box>
                )
            })}


        </Box>
    )
}

export default Sidebar
