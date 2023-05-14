import { Box, Paper, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { FC, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

import useLoggedInUser from '../hooks/useLoggedInUser';
import { SpotifyPlaylist } from '../pages/PlayQuiz';

type Props = {
	playlistId: string;
};

const PlaylistThumbnail: FC<Props> = ({ playlistId }) => {
	const user = useLoggedInUser();
	const [playlist, setPlaylist] = useState<SpotifyPlaylist>();

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
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}
		>
			<Paper
				sx={{
					backgroundColor: 'black',
					p: 1.5,
					display: 'flex',
					flexDirection: 'row',
					gap: 2,
					alignItems: 'center'
				}}
			>
				{playlist?.images && (
					<img
						src={playlist?.images[0]?.url}
						alt="playlist_cover"
						width="40px"
						style={{ alignSelf: 'center' }}
					/>
				)}
				<Link
					to="/quizzes/$playlistId"
					params={{
						playlistId
					}}
				>
					<Typography color="primary">{playlist?.name}</Typography>
				</Link>
			</Paper>

			<Typography color={grey[500]} variant="overline">
				Playlist
			</Typography>
		</Box>
	);
};

export default PlaylistThumbnail;
