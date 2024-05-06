import React from 'react'
import { Form } from 'formik'
import { Box, Typography, Grid } from "@mui/material"
import SdTextField from '@/components/ui/SdTextField'

interface Props { }

function ModuleForm(props: Props) {
    const { } = props

    return (
        <Box style={{ width: '100%' }}>
            <Box style={{ width: '40%' }}>
                <Typography variant='h5'>Physical Characteristics</Typography>
                <Box>
                    <Grid display='flex' justifyContent='space-between'>
                        <Grid item>
                            <Typography>Module width</Typography>
                        </Grid>
                        <Grid item>
                            {/* <SdTextField name='physical' disabled /> */}
                            input
                        </Grid>
                    </Grid>
                </Box>
            </Box>

        </Box>
    )
}

export default ModuleForm
