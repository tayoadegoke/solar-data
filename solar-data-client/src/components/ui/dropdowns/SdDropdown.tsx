import React, { Children, ReactNode } from 'react'
import InputLabel from '@mui/material/InputLabel';
import { SelectChangeEvent, SelectProps } from '@mui/material/Select';
import { FormControl, MenuItem } from '@mui/material';
import { Field } from 'formik';
import { Select } from 'formik-mui'


interface Props extends Omit<SelectProps, 'variant'> {
    children: ReactNode
}

function SdDropdown(props: Props) {

    return (
        <FormControl fullWidth>
            <Field {...props} size='small' component={Select}>
                {props.children}
            </Field>
        </FormControl>
    )
}

export default SdDropdown
