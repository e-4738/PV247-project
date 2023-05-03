import { Typography } from '@mui/material';

import usePageTitle from '../hooks/usePageTitle';
import GuessSong from '../components/GuessSong';

const PlayQuiz = () => {
	usePageTitle('Play');
	return (
		<>
			<Typography variant="h1">
				This is where the PlayQuiz page will be.
			</Typography>
			<GuessSong />
		</>
	);
};

export default PlayQuiz;
