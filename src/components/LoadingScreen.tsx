import { PuffLoader } from 'react-spinners';
import { Box } from '@mui/material';

const LoadingScreen = () => (
	<Box
		sx={{
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			m: 10
		}}
	>
		<PuffLoader color="#d65cf2" />
	</Box>
);

export default LoadingScreen;
