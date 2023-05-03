import { useState, useEffect } from 'react';

const useSpotifyAuth = () => {
	const [authCode, setAuthCode] = useState(null);
	const [accessToken, setAccessToken] = useState(null);

	const clientId = '817f238fdbbe4366b36d51fa37708342';
	const redirectUri = 'http://localhost:5173/login';

	useEffect(() => {
		const generateRandomString = (length: number) => {
			let text = '';
			const possible =
				'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

			for (let i = 0; i < length; i++) {
				text += possible.charAt(Math.floor(Math.random() * possible.length));
			}
			return text;
		};

		const generateCodeChallenge = async (codeVerifier: string) => {
			const base64encode = (string: ArrayBuffer) =>
				window
					.btoa(
						String.fromCharCode.apply(
							null,
							new Uint8Array(string) as unknown as number[]
						)
					)
					.replace(/\+/g, '-')
					.replace(/\//g, '_')
					.replace(/=+$/, '');

			const encoder = new TextEncoder();
			const data = encoder.encode(codeVerifier);
			const digest = await window.crypto.subtle.digest('SHA-256', data);

			return base64encode(digest);
		};

		const codeVerifier = generateRandomString(128);

		generateCodeChallenge(codeVerifier).then(codeChallenge => {
			const state = generateRandomString(16);
			const scope = [
				'user-read-currently-playing',
				'user-read-playback-state',
				'user-top-read',
				'user-modify-playback-state',
				'user-read-private',
				'user-read-email',
				'user-library-read'
			].join(' ');

			localStorage.setItem('code_verifier', codeVerifier);

			const args = new URLSearchParams({
				response_type: 'code',
				client_id: clientId,
				scope,
				redirect_uri: redirectUri,
				state,
				code_challenge_method: 'S256',
				code_challenge: codeChallenge
			});

			window.location = `https://accounts.spotify.com/authorize?${args}` as
				| Location
				| (string & Location);
		});

		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get('code') ?? '';

		const body = new URLSearchParams({
			grant_type: 'authorization_code',
			code,
			redirect_uri: redirectUri,
			client_id: clientId,
			code_verifier: codeVerifier
		});

		const response = fetch('https://accounts.spotify.com/api/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body
		})
			.then(response => {
				if (!response.ok) {
					throw new Error(`HTTP status ${response.status}`);
				}
				return response.json();
			})
			.then(data => {
				setAccessToken(data.access_token);
			})
			.catch(error => {
				console.error('Error:', error);
			});

		const getProfile = async (accessToken: string) => {
			const response = await fetch('https://api.spotify.com/v1/me', {
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			});

			const data = await response.json();
		};
	}, []);
	return accessToken;
};

export default useSpotifyAuth;
