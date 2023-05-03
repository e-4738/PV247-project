import { Typography } from '@mui/material';

import usePageTitle from '../hooks/usePageTitle';

const NotFound = () => {
	usePageTitle('Not Found');
	return <Typography variant="h1">Nothing to see here. Sorry.</Typography>;
};

export default NotFound;
