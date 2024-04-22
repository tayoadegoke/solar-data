import { Button, ButtonBaseProps, ButtonOwnProps, ButtonTypeMap, ExtendButtonBase } from '@mui/material'
import React from 'react'

interface Props extends ButtonOwnProps, Omit<ButtonBaseProps, "color" | "classes"> {
    type?: "submit" | "button" | "reset" | undefined,
}

function SdButton(props: Props) {
    const { } = props

    return (
        <Button {...props} />
    )
}

export default SdButton
