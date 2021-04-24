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


const useStyles = makeStyles({
	switch: {
		position: 'absolute',
		right: '16px',
	},
});

function App(): JSX.Element {

	const [ switched, setSwitched ] = React.useState(false);
	const classes = useStyles();
	const theme = createMuiTheme(switched ? darkTheme : lightTheme);

	const handleChange = () => {
		setSwitched(!switched);
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
						 checked={switched}
						 className={classes.switch}
						 onChange={handleChange}
						 inputProps={{ 'aria-label': 'toggle theme' }}
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
