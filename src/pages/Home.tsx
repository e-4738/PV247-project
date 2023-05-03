import { Typography } from '@mui/material';

import usePageTitle from '../hooks/usePageTitle';

const Home = () => {
	usePageTitle('Home');
	return <Typography variant="h1">Let the games begin</Typography>;
};

export default Home;
