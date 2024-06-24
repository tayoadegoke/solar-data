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

    console.log(data)
    const datasheetParameters = [
        {
            name: 'Name',
            value: data.name
        },
        {
            name: 'Number of MPPT inputs',
            value: '1.000'
        }, {
            name: 'Cec efficiency',
            value: data.inv_snl_eff_cec
        }, {
            name: 'European efficiency',
            value: data.inv_snl_eff_euro
        }, {
            name: 'Maximum AC Power',
            value: data.inv_snl_paco
        }, {
            name: 'Nominal AC voltage',
            value: data.inv_snl_vac
        }, {
            name: 'Maximum DC Power',
            value: data.inv_snl_pdco

        },

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

    const sandiaCoeff = [
        {
            name: 'C0 (Vmp)',
            value: data.inv_snl_c0

        }, {
            name: 'C1 (Vmp)',
            value: data.inv_snl_c1

        }, {
            name: 'C2 (Vmp)',
            value: data.inv_snl_c2

        }, {
            name: 'C3 (Vmp)',
            value: data.inv_snl_c3

        },

    ]
    return (
        <>
            <Box style={{ width: '100%', display: 'flex', gap: '2%' }}>

                <Box style={{ width: '49%', backgroundColor: 'rgba(0, 0, 0, 0.05)', padding: '2em', boxShadow: '3px 6px 3px 0px rgba(168, 163, 163, 0.5)' }}>
                    <Typography variant='h5'>{t('labels.datasheetParameters')}</Typography>
                    <Box>
                        {datasheetParameters.map((c) => {
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

                <Box style={{ width: '49%', backgroundColor: 'rgba(0, 0, 0, 0.05)', padding: '2em', boxShadow: '3px 6px 3px 0px rgba(168, 163, 163, 0.5)' }}>
                    <Typography variant='h5'>{t('labels.sandriaCoefficients')}</Typography>
                    <Box>
                        {sandiaCoeff.map((c) => {
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
