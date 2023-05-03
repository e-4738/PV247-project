import { Typography } from '@mui/material';

import usePageTitle from '../hooks/usePageTitle';

const Login = () => {
	usePageTitle('Login');
	return (
		<Typography variant="h1">This is where the Login page will be.</Typography>
	);
};

export default Login;
