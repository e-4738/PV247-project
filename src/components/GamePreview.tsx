import { FC, useEffect, useState } from 'react';
import { Button, Grid, Paper, Typography } from '@mui/material';

import { SpotifyPlaylist } from '../pages/PlayQuiz';
import { Game, getTopThreeGamesForPlaylist } from '../firebase';

import PlaylistLeaderBoardItem from './PlaylistLeaderBoardItem';
import LoadingScreen from './LoadingScreen';
import { PlayButton } from './MusicButtons';

type Prop = {
	playlist: SpotifyPlaylist;
	onGameStart: () => void;
};

const GamePreview: FC<Prop> = ({ playlist, onGameStart }) => {
	const [topGames, setTopGames] = useState<Game[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const result = await getTopThreeGamesForPlaylist(playlist.id);
			setTopGames(result);
			setIsLoading(false);
		};
		fetchData();
	}, []);

	return (
		<>
			<Paper sx={{ p: 4, width: '100%' }}>
				<Grid container spacing={2}>
					<Grid
						item
						md={5}
						xs={12}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center'
						}}
					>
						<img
							src={playlist?.images[0].url}
							alt="playlist_cover"
							width="350px"
							style={{ alignSelf: 'center', marginBottom: '30px' }}
						/>
						<Typography textAlign="center" variant="h4">
							{playlist?.name}
						</Typography>
						<Typography
							sx={{ wordWrap: 'break-word' }}
							textAlign="center"
							variant="subtitle1"
							fontStyle="italic"
						>
							{playlist?.description}
						</Typography>
					</Grid>
					<Grid
						item
						md={7}
						xs={12}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							gap: 1
						}}
					>
						<Typography variant="h4">Best Results</Typography>
						{isLoading ? (
							<LoadingScreen />
						) : !topGames.length ? (
							<>
								<Typography variant="h6">No recorded results yet.</Typography>
								<Typography variant="subtitle1">
									You can set a new record!
								</Typography>
							</>
						) : (
							topGames.map((game, i) => (
								<PlaylistLeaderBoardItem key={i} position={i} game={game} />
							))
						)}
						{}
					</Grid>
				</Grid>
			</Paper>
			<PlayButton
				handleClick={onGameStart}
				description="Start the quiz"
				variant="contained"
			/>
			{/* <Button sx={{ px: 8 }} variant="contained" onClick={onGameStart}>
				<Typography variant="h6">Play</Typography>
			</Button> */}
		</>
	);
};

export default GamePreview;
