import {
	Box,
	ToggleButton,
	ToggleButtonGroup,
	Typography
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { SetStateAction, useState } from 'react';

import usePageTitle from '../hooks/usePageTitle';
import Playlist from '../components/Playlist';
import useLoggedInUser from '../hooks/useLoggedInUser';

export type SpotifyPlaylist = {
	id: string;
	name: string;
	images: Array<{
		url: string;
	}>;
};

type Category = 'pop' | 'alternative' | 'mood' | 'decades' | 'party';

type CategoryDescription = Record<Category, string>;

const PlayQuiz = () => {
	usePageTitle('Play');
	const user = useLoggedInUser();

	const categoryDescription: CategoryDescription = {
		pop: 'Guess the song from the latest and greatest pop hits from around the world.',
		alternative:
			'Listen to alternative music and test your knowledge by guessing the song.',
		mood: 'Identify songs based on their mood and vibe.',
		decades:
			'Travel through time and guess the iconic hits from different decades.',
		party:
			'Get the party started and see if you can guess the songs from these upbeat party anthems.'
	};

	const [category, setCategory] = useState<Category>('pop');

	const { data } = useQuery({
		queryKey: [category],
		queryFn: () =>
			fetch(
				`https://api.spotify.com/v1/browse/categories/${category}/playlists`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${user?.accessToken}`
					}
				}
			).then(res => res.json())
	});

	const changeCategory = (
		_event: React.MouseEvent<HTMLElement>,
		newCategory: SetStateAction<Category>
	) => {
		if (newCategory !== null) {
			setCategory(newCategory);
		}
	};

	return (
		<>
			<Typography variant="h1">Pick your playlist</Typography>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 1
				}}
			>
				<ToggleButtonGroup value={category} exclusive onChange={changeCategory}>
					{Object.keys(categoryDescription).map(category => (
						<ToggleButton key={category} value={category}>
							<Typography variant="subtitle1">{category}</Typography>
						</ToggleButton>
					))}
				</ToggleButtonGroup>
				<Typography sx={{ m: 2 }} variant="h5">
					{categoryDescription[category]}
				</Typography>
			</Box>

			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'center'
				}}
			>
				{data?.playlists?.items?.map((item: SpotifyPlaylist, key: number) => (
					<Playlist key={key} playlist={item} />
				))}
			</Box>
		</>
	);
};

export default PlayQuiz;
