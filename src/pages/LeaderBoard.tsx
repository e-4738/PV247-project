import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import usePageTitle from '../hooks/usePageTitle';
import LeaderBoardItem from '../components/LeaderBoardItem';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { Game, getTopTenGames } from '../firebase';

const LeaderBoard = () => {
	usePageTitle('Leader Board');
	const user = useLoggedInUser();
	const [topGames, setTopGames] = useState<Game[]>([]);

	useEffect(() => {
		getTopTenGames().then(games => setTopGames(games));
	}, []);

	return (
		<>
			<Typography variant="h4" textAlign="center">
				Leader Board
			</Typography>

			{user && (
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 2
					}}
				>
					{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((position, key) => (
						<LeaderBoardItem
							key={key}
							position={position}
							playerName={topGames[position]?.spotifyDisplayName}
							playerAvatarLink={topGames[position]?.userProfilePictureLink}
							playerSpotifyProfileLink={
								topGames[position]?.spotifyUserProfileLink
							}
							playlistId={topGames[position]?.playlistId}
							gameScore={topGames[position]?.score}
							gameMaxScore={topGames[position]?.maxScore}
						/>
					))}
				</Box>
			)}
		</>
	);
};

export default LeaderBoard;
