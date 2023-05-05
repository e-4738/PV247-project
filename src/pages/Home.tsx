import { Box, Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { setDoc } from 'firebase/firestore';

import usePageTitle from '../hooks/usePageTitle';
import { getAccessToken } from '../utils/spotifyAuthorizationUtils';
import { userDocument } from '../firebase';
import useLoggedInUser from '../hooks/useLoggedInUser';

const Home = () => {
	usePageTitle('Home');
	const user = useLoggedInUser();

	// quite possibly unneeded
	const [accessToken, setAccessToken] = useState<string>();

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
				await setDoc(
					userDocument(user.email),
					{
						mail: user.email,
						accessToken: data.accessToken,
						refreshToken: data.refreshToken
					},
					{ merge: true }
				);
			}
		};

		fetchData();
	}, [code, user]);

	return (
		<>
			<Typography variant="h1">Beat Braniac</Typography>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center'
				}}
			>
				<Typography variant="h5">Your Spotify music quiz companion.</Typography>
				<Typography variant="h6">
					Guess your favourite songs or find new music in a fun way.
				</Typography>
			</Box>

			<Grid container spacing={2}>
				<Grid item xs={12} md={6}>
					<Paper elevation={3} sx={{ p: 2 }}>
						<Typography variant="h5">Leaderboard</Typography>
					</Paper>
				</Grid>
				<Grid item xs={12} md={6}>
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
