import {
	useState,
	createContext,
	FC,
	PropsWithChildren,
	useContext,
	SetStateAction,
	Dispatch
} from 'react';

type AuthState = [string, Dispatch<SetStateAction<string>>];

const SpotifyAccessContext = createContext<AuthState>(undefined as never);

export const SpotifyAccessProvider: FC<PropsWithChildren> = ({ children }) => {
	const accessToken = useState<string>('');

	return (
		<SpotifyAccessContext.Provider value={accessToken}>
			{children}
		</SpotifyAccessContext.Provider>
	);
};

export const useSpotifyAuth = () => useContext(SpotifyAccessContext);
