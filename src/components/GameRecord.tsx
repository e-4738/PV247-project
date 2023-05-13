import { FC, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Paper, Typography } from '@mui/material';
import { Link } from '@tanstack/react-router';
import { grey } from '@mui/material/colors';

import { SpotifyPlaylist } from '../pages/PlayQuiz';
import useLoggedInUser from '../hooks/useLoggedInUser';

type Props = {
	playlistId: string;
	gameScore: number;
	gameMaxScore: number;
};

const GameRecord: FC<Props> = ({ playlistId, gameScore, gameMaxScore }) => {
	const user = useLoggedInUser();
	const [playlist, setPlaylist] = useState<SpotifyPlaylist>();

	const { data, isLoading } = useQuery({
		queryKey: [playlistId],
		queryFn: () =>
			fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${user?.accessToken}`
				}
			}).then(res => res.json())
	});

	useEffect(() => {
		setPlaylist(data);
	}, [data]);

	return (
		<Paper
			sx={{
				p: 2,
				display: 'flex',
				width: '80%',
				flexDirection: 'row',
				justifyContent: 'space-between'
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'flex-center',
					justifyContent: 'space-between'
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						ml: 6
					}}
				>
					{playlist?.images && (
						<img
							src={playlist?.images[0]?.url}
							alt="playlist_cover"
							width="80px"
							style={{ alignSelf: 'center' }}
						/>
					)}
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						ml: 6
					}}
				>
					<Link
						to="/quizzes/$playlistId"
						params={{
							playlistId
						}}
					>
						{playlist?.name}
					</Link>
					<Typography color={grey[500]} variant="overline">
						Playlist
					</Typography>
				</Box>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					ml: 8
				}}
			>
				<Typography
					variant="body1"
					color="secondary"
					sx={{ fontSize: 28, fontWeight: 600 }}
				>
					{gameScore}/{gameMaxScore}
				</Typography>
				<Typography color={grey[500]} variant="overline">
					Score
				</Typography>
			</Box>
		</Paper>
	);
};

export default GameRecord;
