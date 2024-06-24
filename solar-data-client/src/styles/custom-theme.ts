import { createTheme } from "@mui/material";


export const customColors = {
    primary: '#FFCB11',
    primaryContrast: '#000000',
    secondary: '#3C78A9',
    secondaryContrast: '#FFFFFF',
    grey: '#e9eaef'


}

export const theme = createTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: customColors.primary,
            dark: '#002884',
            contrastText: '#000000',
        },
        secondary: {
            light: '#ff7961',
            main: '#3C78A9',
            dark: '#ba000d',
            contrastText: '#ffffff',
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                'containedPrimary': {
                    ':hover': {
                        backgroundColor: customColors.primary
                    }
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                'select': {
                    padding: '12.5px 14px'
                }
            }
        },
    }
});