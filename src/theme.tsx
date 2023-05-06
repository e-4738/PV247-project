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
		},
		h5: {
			fontWeight: 600,
			background:
				'linear-gradient(90deg, rgba(121,9,59,1) 0%, rgba(125,7,144,1) 19%, rgba(0,212,255,1) 66%)',
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
					flexDirection: 'column'
				}
			}
		}
	}
});
