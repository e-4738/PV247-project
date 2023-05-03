import { Typography } from '@mui/material';

import usePageTitle from '../hooks/usePageTitle';

const YourMatches = () => {
	usePageTitle('Your Matches');
	return (
		<Typography variant="h1">
			This is where the YourMatches page will be.
		</Typography>
	);
};

export default YourMatches;
