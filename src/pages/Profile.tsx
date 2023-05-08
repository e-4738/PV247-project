import { Avatar, Button, Link, Paper, Typography } from '@mui/material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useNavigate } from '@tanstack/react-router';
import { grey } from '@mui/material/colors';

import usePageTitle from '../hooks/usePageTitle';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { logOutUser } from '../utils/logOutUser';

const Profile = () => {
	usePageTitle('My Profile');
	const navigate = useNavigate();
	const user = useLoggedInUser();
	return (
		<Paper
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				width: '50%',
				p: 4
			}}
		>
			<Typography variant="h4" textAlign="center" mb={3}>
				Your Profile
			</Typography>
			<Avatar sx={{ width: 200, height: 200, mb: 2 }} src={user?.image} />
			<Typography variant="body1" sx={{ fontSize: 28, fontWeight: 600 }}>
				{user?.displayName}
			</Typography>
			<Typography variant="body2" textAlign="center" sx={{ mb: 2 }}>
				{user?.mail}
			</Typography>
			<Button
				href={user?.profileLink}
				variant="outlined"
				color="secondary"
				sx={{ display: 'flex', alignItems: 'center' }}
			>
				<img src="spotifyLogoMinimal.png" alt="spotify logo" width="24" />
				<Typography variant="overline" pl={1}>
					Go to your Spotify profile
				</Typography>
			</Button>
			<Typography color={grey[600]} variant="overline">
				Spotify ID: {user?.spotifyUserId}
			</Typography>

			<Button
				variant="contained"
				onClick={() => {
					logOutUser();
					navigate({ to: '/' });
				}}
				sx={{ mt: 4 }}
			>
				Logout
				<LogoutRoundedIcon sx={{ ml: 1 }} />
			</Button>
		</Paper>
	);
};

export default Profile;
