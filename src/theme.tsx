import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	palette: {
		primary: { main: '#d65cf2' },
		mode: 'dark'
	},
	typography: {
		fontFamily: ['-apple-system', '"Inter"', 'Arial'].join(','),
		h1: {
			fontWeight: 600,
			background:
				'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(72,191,166,1) 29%, rgba(255,181,22,1) 100%)',
			WebkitBackgroundClip: 'text',
			WebkitTextFillColor: 'transparent'
		}
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				// Css rule that makes sure app is always 100% height of window
				'body, #root': {
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100vh'
				}
			}
		}
	}
});
