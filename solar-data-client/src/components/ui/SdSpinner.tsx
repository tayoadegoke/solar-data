import React from 'react'
import { CircularProgress, Box } from '@mui/material'



function SdSpinner() {


    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CircularProgress />
        </Box>
    )
}

export default SdSpinner
