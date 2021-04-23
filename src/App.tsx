import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { ResultsProvider } from './ResultsContext';
import { Search } from './Search';

function App(): JSX.Element {
	return (
		<ResultsProvider>
			<Container>
				<Typography
				 variant="h2"
				>
					GitHub User Search
				</Typography>
				<Search />
			</Container>
		</ResultsProvider>
	);
};

export default App;
