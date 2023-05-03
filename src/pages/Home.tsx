import { Typography } from '@mui/material';

import usePageTitle from '../hooks/usePageTitle';

const Home = () => {
	usePageTitle('Home');
	return (
		<>
			<Typography variant="h1">Big Braniac</Typography>
			<Typography variant="h6">Let the games begin</Typography>
		</>
	);
};

export default Home;
