import { Buffer } from 'buffer';

import { useState, useMemo } from 'react';
import axios from 'axios';

const useSpotifyAuth = () => {
	const [authCode, setAuthCode] = useState(null);
	const [token, setToken] = useState(null);

	const clientId = process.env.SPOTIFY_CLIENT_ID;
	const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
	const redirectUri = 'http://localhost:5173';

	// surely not completely right, also needs a server to run from
	useMemo(() => {
		const getAuthCode = async () => {
			const scope = [
				'user-read-currently-playing',
				'user-read-playback-state',
				'user-top-read',
				'user-modify-playback-state',
				'user-read-private',
				'user-read-email',
				'user-library-read'
			].join(' ');

			await axios
				.get('/spotify/authorize', {
					params: {
						client_id: clientId,
						response_type: 'code',
						scope,
						redirect_uri: redirectUri
					}
				})
				.then(response => setAuthCode(response.data.code));
		};

		const getAccessToken = async () => {
			const buf = Buffer.from(`${clientId}:${clientSecret}`, 'base64');
			const credentials = buf.toString('base64');

			await axios
				.post('/spotify/api/token', {
					headers: {
						'Content-Type': ' application/x-www-form-urlencoded',
						'Authorization': `Basic ${credentials}`
					},
					params: {
						grant_type: 'authorization_code',
						code: authCode,
						redirectUri
					}
				})
				.then(response => setToken(response.data.access_token));
		};

		getAuthCode();
		getAccessToken();
	}, []);

	return token;
};

export default useSpotifyAuth;
