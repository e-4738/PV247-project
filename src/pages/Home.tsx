import { Box, Grid, Paper, Typography } from '@mui/material';

import usePageTitle from '../hooks/usePageTitle';

const Home = () => {
	usePageTitle('Home');

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
