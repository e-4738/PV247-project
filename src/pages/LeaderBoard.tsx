import { Box, Typography } from '@mui/material';

import usePageTitle from '../hooks/usePageTitle';
import LeaderBoardItem from '../components/LeaderBoardItem';
import useLoggedInUser from '../hooks/useLoggedInUser';

const LeaderBoard = () => {
	usePageTitle('Leader Board');
	const user = useLoggedInUser();
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
					{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((position, key) => (
						<LeaderBoardItem
							key={key}
							position={position}
							playerName={user?.displayName}
							playerAvatarLink={user.image}
							playerSpotifyProfileLink={user.profileLink}
							playlistName="my life is a movie"
							playlistLink="https://open.spotify.com/playlist/37i9dQZF1DX4OzrY981I1W"
							gameScore={7}
							gameDuration={12000}
						/>
					))}
				</Box>
			)}
		</>
	);
};

export default LeaderBoard;
