import React, { useState } from 'react'
import { Box } from "@mui/material"
import InvertersList from './inverters-list'
import InvertersForm from './inverters-form'
import { useInvertersQuery } from '@/data/assessment/assessment.queries'
import SdSpinner from '@/components/ui/SdSpinner'

interface Props { }

function Inverters(props: Props) {
    const { } = props
    const [inverterId, setInverterId] = useState<string | null>(null)
    const { data, isLoading, } = useInvertersQuery(true)


    return (
        <Box sx={{ margin: '2em' }}>
            <InvertersList setInverterId={setInverterId} />
            <Box mt={8}>
                {isLoading &&
                    <SdSpinner />
                }
                {inverterId && data &&
                    <InvertersForm data={data[0]} />
                }
            </Box>


        </Box>
    )
}

export default Inverters
