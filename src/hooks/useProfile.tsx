import { useState } from 'react';

import { SpotifyUser, getSpotifyUserFromDB } from '../firebase';

const useProfile = async (mail: string) => {
	const [profile, setProfile] = useState<SpotifyUser | null>(null);
	const userProfile = await getSpotifyUserFromDB(mail);
	setProfile(userProfile);
	return { profile, setProfile };
};

export default useProfile;
