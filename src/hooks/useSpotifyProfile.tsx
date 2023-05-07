import {
	createContext,
	FC,
	PropsWithChildren,
	useContext,
	useState
} from 'react';

import { SpotifyUser } from '../firebase';

const SpotifyUserContext = createContext<SpotifyUser | undefined>(undefined);

export const SpotifyUserProvider: FC<PropsWithChildren> = ({ children }) => {
	const [spotifyUser, setSpotifyUser] = useState<SpotifyUser>();

	// Setup onAuthChanged once when component is mounted
	// useEffect(() => {
	// 	onSpotifyAuthChanged(u => setSpotifyUser(u ?? undefined));
	// }, []);

	return (
		<SpotifyUserContext.Provider value={spotifyUser}>
			{children}
		</SpotifyUserContext.Provider>
	);
};

const useSpotifyProfile = () => useContext(SpotifyUserContext);

export default useSpotifyProfile;
