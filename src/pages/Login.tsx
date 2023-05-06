import { Button, Paper, Typography, TextField, Box } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { setDoc } from 'firebase/firestore';
import { Image } from 'mui-image';

import usePageTitle from '../hooks/usePageTitle';
import { getRefreshToken, signIn, signUp, userDocument } from '../firebase';
import useField from '../hooks/useField';
import {
	getRefreshedToken,
	getSpotifyAuthorizationCode
} from '../utils/spotifyAuthorizationUtils';

const Login = () => {
	usePageTitle('Login');

	const navigate = useNavigate();

	const [isSignUp, setSignUp] = useState(false);

	const email = useField('email', true);
	const password = useField('password', true);

	const [submitError, setSubmitError] = useState<string>();

	return (
		<Paper
			component="form"
			onSubmit={async (e: FormEvent) => {
				e.preventDefault();
				try {
					if (isSignUp) {
						await signUp(email.value, password.value);
						// since user is signing up, the auth code is needed first
						await getSpotifyAuthorizationCode();
					} else {
						await signIn(email.value, password.value);

						// get the refresh token from db
						const refreshToken = await getRefreshToken(email.value);
						if (refreshToken) {
							const data = await getRefreshedToken(refreshToken);
							console.log(`got refreshed token, token is ${refreshToken}`);

							await setDoc(
								userDocument(email.value),
								{
									mail: email.value,
									accessToken: data.accessToken,
									refreshToken: data.refreshToken
								},
								{ merge: true }
							);
						}
						navigate({ to: '/' });
					}
				} catch (err) {
					setSubmitError(
						(err as { message?: string })?.message ?? 'Unknown Error'
					);
				}
			}}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '70%',
				p: 4,
				gap: 2
			}}
		>
			<Typography variant="h4" textAlign="center" mb={3}>
				User Login
			</Typography>
			<TextField label="email" {...email.props} type="email" />
			<TextField label="password" {...password.props} type="password" />
			<Box
				sx={{
					display: 'flex',
					gap: 2,
					alignItems: 'center',
					alignSelf: 'flex-end',
					mt: 2
				}}
			>
				{submitError && (
					<Typography
						variant="caption"
						textAlign="right"
						sx={{ color: 'error.main' }}
					>
						{submitError}
					</Typography>
				)}
				<Button
					type="submit"
					variant="outlined"
					onClick={() => setSignUp(true)}
				>
					Sign Up & Connect To
					<Box ml="8px">
						<Image
							src="spotifyLogo.png"
							alt="Log in with Spotify."
							width="90px"
							duration={0}
							bgColor="none"
						/>
					</Box>
				</Button>
				<Button
					type="submit"
					variant="contained"
					onClick={() => setSignUp(false)}
				>
					Sign In
				</Button>
			</Box>
		</Paper>
	);
};

export default Login;
