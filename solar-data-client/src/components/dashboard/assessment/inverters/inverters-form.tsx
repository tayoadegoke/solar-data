import React from 'react'
import { Form } from 'formik'
import { useTranslation } from 'react-i18next'
import { Box, Typography, Grid, TextField } from "@mui/material"

interface Props {
    data: any
}

function ModuleForm(props: Props) {
    const { data } = props
    const { t } = useTranslation()

    const physicalCharacteristics = [
        {
            name: 'Module Width',
            value: data.cec_module_width
        },
        {
            name: 'Module Height',
            value: data.cec_module_height
        }, {
            name: 'Module area(m2)',
            value: data.cec_area
        }, {
            name: 'Number Of Cells',
            value: data.cec_n_s
        }, {
            name: 'Temperature coefficient adjustment',
            value: data.cec_adjust
        }
    ]

    const additionalParameters = [
        {
            name: 'T_noct',
            value: data.cec_t_noct
        },
        {
            name: 'A_ref',
            value: data.cec_a_ref
        }, {
            name: 'I_L_ref',
            value: data.cec_i_l_ref
        }, {
            name: 'I_o_ref',
            value: data.cec_i_o_ref
        }, {
            name: 'R_s',
            value: data.cec_r_s
        }, {
            name: 'R_sh_ref',
            value: data.cec_r_sh_ref
        }
    ]

    const otherParameters = [
        {
            name: 'Name',
            value: data.name
        },
        {
            name: 'Technology',
            value: data.technology > 0 ? 'multiSi' : 'monoSi'
        }, {
            name: 'Nominial efficiency',
            value: ''
        }, {
            name: 'Maximum power (Pmp)',
            value: data.cec_p_mp_ref
        }, {
            name: '(Pmp) temp. coefficient',
            value: data.cec_gamma_r
        }, {
            name: '(Pmp) temp. coefficient',
            value: data.cec_r_sh_ref
        }, {
            name: 'Max power voltage (Vmp)',
            value: data.cec_v_mp_ref
        }, {
            name: 'Max power current(Imp)',
            value: data.cec_i_mp_ref
        }, {
            name: 'Open circuit voltage(Vmp)',
            value: data.cec_v_oc_ref
        }, {
            name: '(Voc) temp. coefficient',
            value: ''
        }, {
            name: '(Voc) temp. coefficient',
            value: data.cec_beta_oc

        }, {
            name: 'Short circuit current (Isc)',
            value: data.cec_i_sc_ref
        }, {
            name: '(Isc) temp. coefficient',
            value: ''
        },
        {
            name: '(Isc) temp. coefficient',
            value: ''
        }
    ]
    return (
        <>
            <Box style={{ width: '100%', display: 'flex', gap: '2%' }}>

                <Box style={{ width: '49%', backgroundColor: 'rgba(0, 0, 0, 0.05)', padding: '2em', boxShadow: '3px 6px 3px 0px rgba(168, 163, 163, 0.5)' }}>
                    <Typography variant='h5'>{t('labels.physicalCharacteristics')}</Typography>
                    <Box>
                        {physicalCharacteristics.map((c) => {
                            return (
                                <Grid display='flex' justifyContent='space-between' alignItems='center' key={c.name} mt={2}>

                                    <Grid item>
                                        <Typography>{c.name}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <TextField name='physical' disabled value={c.value} sx={{ 'input': { height: '2px' } }} />

                                    </Grid>

                                </Grid>
                            )
                        })
                        }
                    </Box>

                    <Box mt={4}>
                        <Typography variant='h5'>{t('labels.aditionalParameteres')}</Typography>
                        <Box>
                            {additionalParameters.map((c) => {
                                return (
                                    <Grid display='flex' justifyContent='space-between' alignItems='center' key={c.name} mt={2}>

                                        <Grid item>
                                            <Typography>{c.name}</Typography>
                                        </Grid>
                                        <Grid item>
                                            <TextField name='physical' disabled value={c.value} sx={{ 'input': { height: '2px' } }} />

                                        </Grid>

                                    </Grid>
                                )
                            })
                            }
                        </Box>
                    </Box>

                </Box>

                <Box style={{ width: '49%', backgroundColor: 'rgba(0, 0, 0, 0.05)', padding: '2em', boxShadow: '3px 6px 3px 0px rgba(168, 163, 163, 0.5)' }}>

                    <Box>
                        {otherParameters.map((c) => {
                            return (

                                <Grid display='flex' justifyContent='space-between' alignItems='center' key={c.name} mt={2}>

                                    <Grid item>
                                        <Typography>{c.name}</Typography>
                                    </Grid>
                                    <Grid item width={'65%'}>
                                        <TextField name='physical' disabled value={c.value} sx={{ width: '100%', 'input': { height: '2px' } }} />

                                    </Grid>

                                </Grid>


                            )
                        })
                        }
                    </Box>


                </Box>

            </Box>

        </>
    )
}

export default ModuleForm
