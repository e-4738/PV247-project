type AuthenticationResponse = {
	accessToken?: string;
	refreshToken?: string;
};

export const generateRandomString = (length: number) => {
	let text = '';
	const possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

export const generateCodeChallenge = async (codeVerifier: string) => {
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

export const getScopes = (): string =>
	[
		'user-read-currently-playing',
		'user-read-playback-state',
		'user-top-read',
		'user-modify-playback-state',
		'user-read-private',
		'user-read-email',
		'user-library-read'
	].join(' ');

const callTokenApi = async (
	body: URLSearchParams
): Promise<AuthenticationResponse> => {
	const tokens: AuthenticationResponse = {
		accessToken: undefined,
		refreshToken: undefined
	};

	await fetch('https://accounts.spotify.com/api/token', {
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
			tokens.accessToken = data.access_token;
			tokens.refreshToken = data.refresh_token;
			return tokens;
		})
		.catch(error => {
			console.error('Error callApi:', error);
		});

	return tokens;
};

export const getAccessToken = async (
	code: string
): Promise<AuthenticationResponse> => {
	const clientId = process.env.REACT_APP_CLIENT_ID ?? '';
	const redirectUri = 'http://localhost:5173';

	const codeVerifier = localStorage.getItem('code_verifier') ?? '';

	const body = new URLSearchParams({
		grant_type: 'authorization_code',
		code,
		redirect_uri: redirectUri,
		client_id: clientId,
		code_verifier: codeVerifier
	});

	return callTokenApi(body);
};

export const getRefreshedToken = async (
	refresh_token: string
): Promise<AuthenticationResponse> => {
	const clientId = process.env.REACT_APP_CLIENT_ID ?? '';

	const body = new URLSearchParams({
		grant_type: 'refresh_token',
		client_id: clientId,
		refresh_token
	});

	return callTokenApi(body);
};
