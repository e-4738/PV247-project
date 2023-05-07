import { Avatar, Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import usePageTitle from '../hooks/usePageTitle';
import Playlist from '../components/Playlist';
import useLoggedInUser from '../hooks/useLoggedInUser';

export type SpotifyPlaylist = {
	name: string;
	images: Array<{
		url: string;
	}>;
};

const PlayQuiz = () => {
	usePageTitle('Play');
	const user = useLoggedInUser();

	const { data } = useQuery({
		queryKey: ['playlists'],
		queryFn: () =>
			fetch('https://api.spotify.com/v1/browse/categories/pop/playlists', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${user?.accessToken}`
				}
			}).then(res => res.json())
	});

	return (
		<>
			<Avatar sx={{ width: 200, height: 200 }} src={user?.image} />
			<Typography variant="h1">Pick your playlist</Typography>
			<Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
				{data?.playlists?.items?.map((item: SpotifyPlaylist, key: number) => (
					<Playlist key={key} data={item} />
				))}
			</Box>
		</>
	);
};

export default PlayQuiz;
