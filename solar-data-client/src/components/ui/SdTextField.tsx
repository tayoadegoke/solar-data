import React from 'react'
import { Field } from 'formik'
import { TextField } from 'formik-mui'
import { TextFieldProps, InputBaseProps, TextFieldVariants } from '@mui/material'


interface Props extends Omit<TextFieldProps, 'variant'> {

}

function SdTextField(props: Props) {

    return (
        <Field component={TextField} {...props} size='small' />
    )
}

export default SdTextField
