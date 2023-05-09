import { useQuery } from '@tanstack/react-query';

import useLoggedInUser from './useLoggedInUser';

export type PlaylistTrack = {
	track: {
		album: {
			name: string;
			images: Array<{
				url: string;
			}>;
		};
		artists: Array<{
			name: string;
		}>;
		name: string;
		preview_url: string;
	};
};

const usePlaylistsTracks = (playlistId: string): Array<PlaylistTrack> => {
	const user = useLoggedInUser();

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

	return data?.tracks?.items
		.filter((playlistTrack: PlaylistTrack) => playlistTrack.track.preview_url)
		.slice(0, 10);
};

export default usePlaylistsTracks;
