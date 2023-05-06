import { Box, Grid, Paper, Typography } from '@mui/material';
import { useEffect } from 'react';
import { setDoc } from 'firebase/firestore';

import usePageTitle from '../hooks/usePageTitle';
import {
	fetchProfile,
	getAccessToken
} from '../utils/spotifyAuthorizationUtils';
import { userDocument } from '../firebase';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { useSpotifyAuth } from '../hooks/useSpotifyAuth';

const Home = () => {
	usePageTitle('Home');
	const user = useLoggedInUser();
	const [accessToken, setAccessToken] = useSpotifyAuth();

	const urlParams = new URLSearchParams(window.location.search);
	const code = urlParams.get('code') ?? undefined;

	//not the best place to do it either
	const fetchProfileData = async (token: string) => {
		const profile = await fetchProfile(token);
		console.log(`got profile, profile is:${profile}`);

		console.log(`name:${profile.display_name}`);
		console.log(`id:${profile.id}`);
		console.log(`email:${profile.email}`);
		console.log(`image:${profile.images[0].url}`);
		console.log(`email:${profile.href}`);

		console.log('data fetched, profile printing over');
	};

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

				fetchProfileData(data.accessToken);

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

	// useEffect(() => {
	// 	fetchProfileData();
	// }, [accessToken]);

	/** 
	useEffect(() => {
		const loadSpotifyData = async () => {
			const result = await fetch(
				'https://api.spotify.com/v1/browse/categories/pop/playlists',
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${accessToken}`
					}
				}
			);
			if (!result.ok) {
				return '';
			}
			const data = await result.json();
			const { d, e } = data;
			console.log(data);
			setDataa(d);
		};
		loadSpotifyData();
	}, []);
*/
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
			{/* {accessToken} */}
		</>
	);
};

export default Home;
