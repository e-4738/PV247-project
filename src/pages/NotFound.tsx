import { Typography } from '@mui/material';

import usePageTitle from '../hooks/usePageTitle';

const NotFound = () => {
	usePageTitle('Not Found');
	return (
		<>
			<Typography variant="h3">Nothing to see here. Sorry.</Typography>
			<img src="notfoundtaylor.gif" alt="Taylor says what?" />
		</>
	);
};

export default NotFound;
