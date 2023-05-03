import { Typography } from '@mui/material';

import usePageTitle from '../hooks/usePageTitle';

const LeaderBoard = () => {
	usePageTitle('Leader Board');
	return (
		<Typography variant="h1">This is where the leaderboard will be.</Typography>
	);
};

export default LeaderBoard;
