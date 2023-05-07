import { Avatar, Button, Paper, Typography } from '@mui/material';
import { getAuth, signOut } from 'firebase/auth';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { useNavigate } from '@tanstack/react-router';

import usePageTitle from '../hooks/usePageTitle';
import useLoggedInUser from '../hooks/useLoggedInUser';

const Profile = () => {
	usePageTitle('My Profile');
	const navigate = useNavigate();
	const user = useLoggedInUser();

	return (
		<>
			<Typography variant="h4" textAlign="center" mb={3}>
				Your Profile
			</Typography>
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
				<Avatar
					sx={{ width: 200, height: 200 }}
					src={user?.photoURL ?? 'taylor.jpg'}
				/>
				<Typography>Display Name: ...</Typography>
				<Typography>UserID: ...</Typography>
				<Typography>Spotify URI: ...</Typography>
				<Typography>LinkD: ...</Typography>

				<Button
					variant="contained"
					onClick={() => {
						signOut(getAuth());
						navigate({ to: '/' });
					}}
				>
					Logout
					<LogoutRoundedIcon sx={{ ml: 1 }} />
				</Button>
			</Paper>
		</>
	);
};

export default Profile;
