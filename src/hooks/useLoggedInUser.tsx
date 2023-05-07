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
	getAccessToken
} from '../utils/spotifyAuthorizationUtils';

type SpotifyUser = {
	spotifyUserId: string;
	mail: string;
	displayName: string;
	image: string;
	profileLink: string;
	accessToken: string;
	refreshtoken: string;
};

const UserContext = createContext<SpotifyUser | undefined>(undefined);

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
	// Hold user info in state
	const [accessToken, setAccessToken] = useState<string>();
	const [user, setUser] = useState<SpotifyUser>();

	useEffect(() => {
		const fetchData = async (code: string) => {
			const data = await getAccessToken(code);

			if (data.accessToken && data.refreshToken) {
				setAccessToken(data.accessToken);
				localStorage.setItem('access_token', data.accessToken);
				localStorage.setItem('refresh_token', data.refreshToken);
				console.log(`got token, token is ${data.accessToken}`);
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
				accessToken,
				refreshToken: localStorage.getItem('refresh_token')
			};

			setUser(SU);
		};

		if (accessToken) {
			fetchProfileData();
		}
	}, [accessToken]);

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

// Hook providing logged in user information
const useLoggedInUser = () => useContext(UserContext);

export default useLoggedInUser;
