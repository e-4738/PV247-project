import { FC, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Paper } from '@mui/material';

import { SpotifyPlaylist } from '../pages/PlayQuiz';
import useLoggedInUser from '../hooks/useLoggedInUser';

import PlaylistThumbnail from './PlaylistThumbnail';
import ItemScore from './ItemScore';

type Props = {
	playlistId: string;
	gameScore: number;
	gameMaxScore: number;
};

const GameRecord: FC<Props> = ({ playlistId, gameScore, gameMaxScore }) => {
	const user = useLoggedInUser();
	const [, setPlaylist] = useState<SpotifyPlaylist>();

	const { data } = useQuery({
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
				pl: 3,
				pr: 4,
				display: 'flex',
				width: '60%',
				flexDirection: 'row',
				justifyContent: 'center',
				alignItems: 'baseline'
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					width: '60%'
				}}
			>
				<PlaylistThumbnail playlistId={playlistId} />
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					ml: 8,
					width: '40%'
				}}
			>
				<ItemScore gameScore={gameScore} gameMaxScore={gameMaxScore} />
			</Box>
		</Paper>
	);
};

export default GameRecord;
