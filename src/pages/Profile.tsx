import { Avatar, Button, Paper, Typography } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useNavigate } from '@tanstack/react-router';

import usePageTitle from '../hooks/usePageTitle';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { logOutUser } from '../utils/logOutUser';

const Profile = () => {
	usePageTitle('My Profile');
	const navigate = useNavigate();
	const user = useLoggedInUser();
	return (
		<>
			<Typography variant="h4" textAlign="center" mb={3}>
				Your Profile
			</Typography>
			{user && (
				<Paper
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						width: '50%',
						p: 4,
						gap: 2
					}}
				>
					<Avatar sx={{ width: 200, height: 200 }} src={user?.image} />
					<Typography>{user?.displayName}</Typography>
					<Typography>SpotifyID: {user?.spotifyUserId}</Typography>
					<Typography>Spotify Profile Link: {user?.profileLink}.</Typography>

					<Button
						variant="contained"
						onClick={() => {
							logOutUser();
							navigate({ to: '/' });
						}}
					>
						Logout
						<LogoutRoundedIcon sx={{ ml: 1 }} />
					</Button>
				</Paper>
			)}
		</>
	);
};

export default Profile;
