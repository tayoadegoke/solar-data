import React from 'react'
import { Box, MenuItem, Select, Typography } from '@mui/material'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import { useSession, signOut } from 'next-auth/react'

import { customColors } from '@/styles/custom-theme'

import { useLanguage, Language } from '@/utils/hooks/useLanguage'
import useSdMediaQuery from '@/utils/hooks/useMediaQuery'
import SdButton from '../ui/SdButton'
import { useRouter } from 'next/router'



function Navigation() {
    const { t } = useTranslation()
    const router = useRouter()
    const { changeLanguage, language } = useLanguage()
    const { xs, md, lg } = useSdMediaQuery()
    const session = useSession()


    return (
        <Box display={'flex'} justifyContent={'space-between'} sx={{ height: '60px', backgroundColor: customColors.secondary }}>
            <Box pl={xs ? 0 : 2} onClick={() => router.push('/')}>
                <Image src="/solar-data-logo.png" width={60} alt='solar data logo' height={50} />
            </Box>
            <Box display={'flex'} justifyContent={'flex-end'} alignItems={'center'} sx={{ color: customColors.secondaryContrast, width: '30%' }} >
                {lg &&
                    <>
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
                        {session.status === 'authenticated' &&
                            <SdButton variant='outlined' onClick={() => {
                                signOut()
                            }} sx={{ mx: '2em' }}>{t('uppercase.logout')}</SdButton>
                        }
                    </>
                }

            </Box>

        </Box>
    )
}

export default Navigation
