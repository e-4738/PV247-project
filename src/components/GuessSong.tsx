import { Button, Paper, TextField } from '@mui/material';
import { FormEvent } from 'react';

// import useField from '../hooks/useField';

// const song = useField('song', true);
// const artist = useField('artist', true);

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
				p: 4,
				paddingBottom: 8
			}}
		>
			<img src="questionmarksquare.png" alt="album_cover" width="250px" />
			<TextField id="song" label="Song" variant="standard" />
			<TextField id="artist" label="Artist" variant="standard" />
		</Paper>
		<Button
			variant="contained"
			onClick={e => {
				console.log(e);
			}}
		>
			Guess
		</Button>
	</>
);

export default GuessSong;
