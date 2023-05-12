import { Avatar, Button, Paper, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

import usePageTitle from '../hooks/usePageTitle';
import useLoggedInUser from '../hooks/useLoggedInUser';

const Profile = () => {
	usePageTitle('My Profile');
	const user = useLoggedInUser();
	return (
		<Paper
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				width: '50%',
				p: 4,
				pt: 6,
				pb: 6
			}}
		>
			<Typography variant="h4" textAlign="center" mb={4}>
				Your Profile
			</Typography>
			<Avatar sx={{ width: 200, height: 200, mb: 2 }} src={user?.image} />
			<Typography variant="body1" sx={{ fontSize: 28, fontWeight: 600 }}>
				{user?.displayName}
			</Typography>
			<Typography variant="body2" textAlign="center" sx={{ mb: 3 }}>
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
		</Paper>
	);
};

export default Profile;
