import {
	createContext,
	FC,
	PropsWithChildren,
	useContext,
	useEffect,
	useState
} from 'react';

import {
	fetchProfile,
	getAccessToken,
	getRefreshedToken
} from '../utils/spotifyAuthorizationUtils';

type SpotifyUser = {
	spotifyUserId: string;
	mail: string;
	displayName: string;
	image: string;
	profileLink: string;
	accessToken: string;
	refreshToken: string;
};

const UserContext = createContext<SpotifyUser | undefined>(undefined);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
	const [accessToken, setAccessToken] = useState<string>(
		localStorage.getItem('access_token') ?? ''
	);
	const [user, setUser] = useState<SpotifyUser>();

	useEffect(() => {
		const fetchData = async (code: string) => {
			const data = await getAccessToken(code);

			if (data.accessToken && data.refreshToken) {
				setAccessToken(data.accessToken);
				localStorage.setItem('access_token', data.accessToken);
				localStorage.setItem('refresh_token', data.refreshToken);
				console.log(
					`authorization successful:\naccess token:\n${data.accessToken}\n\nrefresh token:\n${data.refreshToken}\n`
				);
			}
		};

		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get('code') ?? undefined;

		if (code) {
			fetchData(code);
		}
	}, []);

	useEffect(() => {
		const fetchProfileData = async () => {
			const profile = await fetchProfile(accessToken ?? '');

			const SU: SpotifyUser = {
				mail: profile.email,
				spotifyUserId: profile.id,
				displayName: profile.display_name,
				image: profile.images[0].url,
				profileLink: profile.external_urls.spotify,
				accessToken: accessToken ?? '',
				refreshToken: localStorage.getItem('refresh_token') ?? ''
			};
			setUser(SU);
		};

		if (accessToken) {
			fetchProfileData();
		}
	}, [accessToken]);

	// after 1 hour the acess token expires and a new one needs to be obtained using the refresh token
	useEffect(() => {
		const refreshTokens = async () => {
			const newTokens = await getRefreshedToken(user?.refreshToken ?? '');

			localStorage.setItem('access_token', newTokens.accessToken ?? '');
			localStorage.setItem('refresh_token', newTokens.refreshToken ?? '');

			setAccessToken(newTokens.accessToken);
			// + the user profile automatically updates, because the acessToken state changes
		};

		const interval = setInterval(async () => {
			console.log('Time to update tokens!');
			if (user !== undefined) {
				refreshTokens();
				console.log(`Updated the access token to:\n${user.accessToken}`);
				console.log(`Updated the refresh token to:\n${user.refreshToken}`);
			} else {
				console.log('No user authentified.');
			}
		}, 60000 * 55); // 60000 (1 minute in ms) * 55 = 55 minutes in miliseconds
		return () => clearInterval(interval);
	}, [user]);

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

const useLoggedInUser = () => useContext(UserContext);

export default useLoggedInUser;
