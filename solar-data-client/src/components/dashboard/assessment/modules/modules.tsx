import React, { useState } from 'react'
import { Box } from "@mui/material"
import ModulesList from './modules-list'
import ModuleForm from './module-form'
import { useModuleDetailQuery } from '@/data/assessment/assessment.queries'
import SdSpinner from '@/components/ui/SdSpinner'

interface Props { }

function Modules(props: Props) {
    const { } = props
    const [moduleId, setModuleId] = useState<string | null>(null)
    const { data, isLoading, } = useModuleDetailQuery(moduleId ?? '')


    return (
        <Box sx={{ margin: '2em' }}>
            <ModulesList setModuleId={setModuleId} />
            <Box mt={8}>
                {isLoading &&
                    <SdSpinner />
                }
                {moduleId && data &&
                    <ModuleForm />
                }
            </Box>


        </Box>
    )
}

export default Modules
