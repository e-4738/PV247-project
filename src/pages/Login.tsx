import { Paper, Typography } from '@mui/material';

import usePageTitle from '../hooks/usePageTitle';
import LoginWithSpotify from '../components/LoginWithSpotify';

const Login = () => {
	usePageTitle('Login');

	return (
		<Paper
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '70%',
				p: 4,
				gap: 2
			}}
		>
			<Typography variant="h4" textAlign="center" mb={3}>
				User Login
			</Typography>

			<LoginWithSpotify />
		</Paper>
	);
};

export default Login;
