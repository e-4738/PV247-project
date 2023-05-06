import { Box, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import usePageTitle from '../hooks/usePageTitle';
import { useSpotifyAuth } from '../hooks/useSpotifyAuth';
import Playlist from '../components/Playlist';

type SpotifyPlaylists = {
	href: string;
	limit: number;
	next: string;
	offset: number;
	previous: string;
	total: number;
	items: Array<{
		collaborative: boolean;
		description: string;
		external_urls: { spotify: string };
		href: string;
		id: string;
		images: Array<{
			url: string;
			height: number;
			width: number;
		}>;
		name: string;
		owner: {
			external_urls: { spotify: string };
			followers: { href: string; total: number };
			href: string;
			id: string;
			type: string;
			uri: string;
			display_name: string;
		};
		public: boolean;
		snapshot_id: string;
		tracks: {
			href: string;
			total: number;
		};
		type: string;
		uri: string;
	}>;
};

const PlayQuiz = () => {
	usePageTitle('Play');
	const [accessToken] = useSpotifyAuth();

	console.log(accessToken);

	const query = useQuery({
		queryKey: ['playlists'],
		queryFn: () =>
			fetch('https://api.spotify.com/v1/browse/categories/pop/playlists', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}).then(res => res.json())
	});

	console.log(query);
	console.log(query.error);
	const data: SpotifyPlaylists = query.data;

	return (
		<>
			<Typography variant="h1">Pick your playlist</Typography>
			<Box sx={{ display: 'flex' }}>
				{data.items.map((item, key) => (
					<Playlist key={key} name={item.name} />
				))}
			</Box>
		</>
	);
};

export default PlayQuiz;
