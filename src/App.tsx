import React from 'react';
import {
	Container,
	createMuiTheme,
	CssBaseline,
	makeStyles,
	Switch,
	ThemeProvider,
	Tooltip
} from '@material-ui/core';
import { ResultsProvider } from './context/ResultsContext';
import { Header } from './components/Header';
import { Search } from './components/Search';
import { lightTheme, darkTheme } from './themes';
import Cookies from 'universal-cookie';


const cookies = new Cookies();

const useStyles = makeStyles({
	switch: {
		position: 'absolute',
		right: '16px',
	},
});

function App(): JSX.Element {

	const [ darkMode, setDarkMode ] = React.useState(false);
	const classes = useStyles();
	const theme = createMuiTheme(darkMode ? darkTheme : lightTheme);

	// Check if user has a theme cookie already set
	React.useEffect(() => {
		const themeCookie = cookies.get('theme');
		if (themeCookie) {
			const b = themeCookie === 'dark';
			setDarkMode(b);
		}
	}, []);

	const handleChange = () => {

		// Toggle currentTheme and switched
		const currentTheme = darkMode ? 'light' : 'dark';
		setDarkMode(!darkMode);
		// Get date a month from now (add month in milliseconds)
		const d = Date.now() + 2629800000;
		const expDate = new Date(d);
		// Update cookie value
		cookies.set('theme', currentTheme, {
			path: '/',
			secure: true,
			sameSite: "strict",
			expires: expDate
		});
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<ResultsProvider>
				<Container>
					<Tooltip
					 title="Toggle Theme"
					 aria-label="toggle theme"
					 placement='left'
					>
						<Switch
						 checked={darkMode}
						 className={classes.switch}
						 onChange={handleChange}
						 inputProps={{
							 'aria-label': 'toggle theme'
						 }}
						 color="primary"
						/>
					</Tooltip>
					<Header />
					<Search />
				</Container>
			</ResultsProvider>
		</ThemeProvider>
	);
};

export default App;
