import { Box, Typography } from '@mui/material';

import usePageTitle from '../hooks/usePageTitle';
import useLoggedInUser from '../hooks/useLoggedInUser';
import LoginWithSpotify from '../components/LoginWithSpotify';

const Home = () => {
	usePageTitle('Home');
	const user = useLoggedInUser();

	return (
		<>
			<img src="gradient_brain.png" alt="beatbranic logo" width="400px" />
			<Typography variant="h1">BeatBraniac</Typography>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>
				{user && (
					<Typography variant="h6">Hello {user.displayName}!</Typography>
				)}
				<Typography variant="h5">
					Welcome to your Spotify music quiz companion!
				</Typography>
				<Typography variant="h6">
					Guess your favourite songs or find new music in a fun way.
				</Typography>
			</Box>
			{!user && <LoginWithSpotify />}
		</>
	);
};

export default Home;
