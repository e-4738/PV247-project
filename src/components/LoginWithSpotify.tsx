import { Button, Box } from '@mui/material';
import { Image } from 'mui-image';
import { FC } from 'react';

import { getSpotifyAuthorizationCode } from '../utils/spotifyAuthorizationUtils';

const LoginWithSpotify: FC = () => (
	<Button
		type="submit"
		variant="outlined"
		onClick={getSpotifyAuthorizationCode}
	>
		LogIn With
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
);

export default LoginWithSpotify;
