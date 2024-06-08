import React, { useState } from 'react'
import { Box } from "@mui/material"
import InvertersList from './inverters-list'
import InvertersForm from './inverters-form'
import { useModuleDetailQuery } from '@/data/assessment/assessment.queries'
import SdSpinner from '@/components/ui/SdSpinner'

interface Props { }

function Inverters(props: Props) {
    const { } = props
    const [moduleId, setModuleId] = useState<string | null>(null)
    const { data, isLoading, } = useModuleDetailQuery(moduleId ?? '')


    return (
        <Box sx={{ margin: '2em' }}>
            <InvertersList setModuleId={setModuleId} />
            <Box mt={8}>
                {isLoading &&
                    <SdSpinner />
                }
                {moduleId && data &&
                    <InvertersForm data={data} />
                }
            </Box>


        </Box>
    )
}

export default Inverters
