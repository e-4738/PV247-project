import { Button, Paper, Typography, Box } from '@mui/material';
import { Image } from 'mui-image';

import usePageTitle from '../hooks/usePageTitle';
import {
	getSpotifyAuthorizationCode
} from '../utils/spotifyAuthorizationUtils';

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

			<Button
				type="submit"
				variant="outlined"
				onClick={getSpotifyAuthorizationCode}
			>
				Sign In With
				<Box ml="8px">
					<Image
						src="spotifyLogo.png"
						alt="Log in with Spotify."
						width="90px"
						duration={0}
						bgColor="none"
					/>
				</Box>
			</Button>
		</Paper>
	);
};

export default Login;
