import { Button, Paper, TextField, Typography } from '@mui/material';
import { FormEvent, useState } from 'react';

// import useField from '../hooks/useField';

// const song = useField('song', true);
// const artist = useField('artist', true);

// const [isSignUp, setSignUp] = useState(false);

// const [submitError, setSubmitError] = useState<string>();

const GuessSong = () => (
	<>
		<Paper
			component="form"
			onSubmit={(e: FormEvent) => {
				console.log(e);
			}}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				width: '40%',
				p: 4,
				gap: 2
			}}
		>
			<img src="midnights.png" alt="album_cover" width="200px" />
			<Typography>Song</Typography>
			<Typography>Artist</Typography>
			{/* <TextField label="song" {...song.props} type="email" />
		<TextField label="artist" {...artist.props} type="password" /> */}
		</Paper>
		<Button variant="contained">Submit</Button>
	</>
);

export default GuessSong;
