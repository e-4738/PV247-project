import { Typography } from '@mui/material';

import usePageTitle from '../hooks/usePageTitle';
import GuessSong from '../components/GuessSong';
import useLyricsGenerator from '../hooks/useLyricsGenerator';

const PlayQuiz = () => {
	usePageTitle('Play');
	const quote = useLyricsGenerator();

	return (
		<>
			<Typography>{quote}</Typography>
			<Typography variant="h1">
				This is where the PlayQuiz page will be.
			</Typography>
			<GuessSong />
		</>
	);
};

export default PlayQuiz;
