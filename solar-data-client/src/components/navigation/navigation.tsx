import React from 'react'
import { Box, MenuItem, Select, Typography } from '@mui/material'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'

import { customColors } from '@/styles/custom-theme'

import { useLanguage, Language } from '@/utils/hooks/useLanguage'


function Navigation() {
    const { t } = useTranslation()
    const { changeLanguage, language } = useLanguage()


    return (
        <Box display={'flex'} justifyContent={'space-between'} sx={{ height: '60px', backgroundColor: customColors.secondary }} pl={2}>
            <Box pl={2}>
                <Image src="/solar-data-logo.png" width={60} alt='solar data logo' height={50} />
            </Box>
            <Box display={'flex'} justifyContent={'space-evenly'} alignItems={'center'} sx={{ color: customColors.secondaryContrast, width: '10%', }}>
                {/* <Typography variant='subtitle1'>{t('headerMenu.login')}</Typography>
                <Typography variant='subtitle1'>{t('headerMenu.register')}</Typography> */}
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={language}
                    label="Language"
                    onChange={(e) => changeLanguage(e.target.value as Language)}
                    sx={{ color: customColors.secondaryContrast }}
                >
                    <MenuItem value={'en'}>EN</MenuItem>
                    <MenuItem value={'mk'}>MK</MenuItem>
                </Select>

            </Box>

        </Box>
    )
}

export default Navigation
