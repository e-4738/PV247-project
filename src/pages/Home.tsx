import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { useEffect } from 'react';
import { setDoc } from 'firebase/firestore';

import usePageTitle from '../hooks/usePageTitle';
import {
	fetchProfile,
	getAccessToken
} from '../utils/spotifyAuthorizationUtils';
import { SpotifyUser, userDocument } from '../firebase';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { useSpotifyAuth } from '../hooks/useSpotifyAuth';
import useSpotifyProfile from '../hooks/useSpotifyProfile';

const Home = () => {
	usePageTitle('Home');
	const user = useLoggedInUser();
	const [accessToken, setAccessToken] = useSpotifyAuth();
	const profileContext = useSpotifyProfile();

	const urlParams = new URLSearchParams(window.location.search);
	const code = urlParams.get('code') ?? undefined;

	//not the best place to do it, but at least it works
	useEffect(() => {
		const fetchData = async () => {
			if (!code || !user?.email) {
				return;
			}

			const data = await getAccessToken(code);

			if (data.accessToken) {
				setAccessToken(data.accessToken);
				console.log(`got token, token is ${data.accessToken}`);

				const profile = await fetchProfile(data.accessToken);

				const SU: SpotifyUser = {
					mail: user.email,
					spotifyUserId: profile.id,
					displayName: profile.display_name,
					image: profile.images[0].url,
					profileLink: profile.external_urls.spotify,
					accessToken: data.accessToken,
					refreshToken: data.refreshToken ?? ''
				};

				// profileContext.setSpotifyUser(SU);

				await setDoc(userDocument(user.email), SU, { merge: true });
			}
		};

		fetchData();
	}, [code, user]);

	return (
		<>
			<img src="gradient_brain.png" alt="beatbranic logo" width="400px" />
			<Typography variant="h1">Beat Braniac</Typography>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>
				{user && (
					<Typography variant="h6">
						Hello {user?.displayName ?? user?.email}!
					</Typography>
				)}
				<Typography variant="h5">
					Welcome to your Spotify music quiz companion!
				</Typography>
				<Typography variant="h6">
					Guess your favourite songs or find new music in a fun way.
				</Typography>
			</Box>
			<Grid container spacing={2} width="650px">
				<Grid item xs={12}>
					<Paper elevation={3} sx={{ p: 2 }}>
						<Typography variant="h5">Leaderboard</Typography>
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<Paper elevation={3} sx={{ p: 2 }}>
						<Typography variant="h5">Recent matches</Typography>
					</Paper>
				</Grid>
				<Grid item xs={12}>
					<Paper elevation={3} sx={{ p: 2 }}>
						<Typography variant="h5">Popular Today</Typography>
					</Paper>
				</Grid>
			</Grid>
		</>
	);
};

export default Home;
