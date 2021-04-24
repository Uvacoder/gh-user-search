import { createMuiTheme } from "@material-ui/core";


export const lightTheme = createMuiTheme({
	overrides: {
	},
	palette: {
		type: 'light',
		primary: {
			light: '#7be0e4',
			main: '#5ce1e6',
			dark: '#3bc3c8',
			contrastText: '#000'
		},
		secondary: {
			main: '#ff66c4',
			contrastText: '#000'
		},
		text: {
			primary: '#000',
			secondary: '#000',
		},
		background: {
			default: '#fff',
            paper: '#FBFBFB'
		}
	},
	shape: {
		borderRadius: 10
	},
	props: {
		MuiSwitch: {
			disableRipple: true,
		},
		MuiTextField: {
			margin: 'dense',
			size: 'small',
			variant: 'outlined',
		},
		MuiInputLabel: {
			shrink: false,
		},
        MuiOutlinedInput: {
            notched: false
        }
	}
});

export const darkTheme = createMuiTheme({
	overrides: {
	},
	palette: {
		type: 'dark',
		primary: {
			light: '#7be0e4',
			main: '#5ce1e6',
			dark: '#3bc3c8',
			contrastText: '#000'
		},
		secondary: {
			main: '#ff66c4',
			contrastText: '#000'
		},
		text: {
			primary: '#e6e6e6',
			secondary: '#e6e6e6',
		},
		background: {
			default: '#171717',
            paper: '#222327'
		}
	},
	shape: {
		borderRadius: 10
	},
	props: {
		MuiSwitch: {
			disableRipple: true,
		},
		MuiTextField: {
			margin: 'dense',
			size: 'small',
			variant: 'outlined',
		},
		MuiInputLabel: {
			shrink: false,
		},
        MuiOutlinedInput: {
            notched: false
        }
	}
});

