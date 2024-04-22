import { getCountries } from '@/utils/utils'
import React, { useMemo } from 'react'
import SdDropdown from './SdDropdown'
import { useTranslation } from "next-i18next";
import { MenuItem } from '@mui/material'

interface Props { }


function CountryDropdown(props: Props) {
    const { } = props
    const countries = useMemo(() => getCountries(), [])
    const { t } = useTranslation()

    const countryOptions = () => {
        return (
            countries.map((item) => {
                return (
                    <MenuItem value={item.name} key={item.code}>{`${item.name} (${item.dial_code})`}</MenuItem>
                )
            })
        )
    }
    return (
        <SdDropdown label={t('labels.country')} name="country" required >
            {countryOptions()}
        </SdDropdown>
    )
}

export default CountryDropdown
