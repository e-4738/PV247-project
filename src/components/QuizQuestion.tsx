import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { FC, FormEvent, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';

import { PlaylistTrack } from '../hooks/usePlaylistsTracks';
import useField from '../hooks/useField';

import GuessedTrack from './GuessedTrack';
import { SkipNextButton } from './MusicButtons';

type Prop = {
	playlistTrack: PlaylistTrack;
	onNext: any;
	onCorrect: any;
};

const QuizQuestion: FC<Prop> = ({ playlistTrack, onNext, onCorrect }) => {
	const song = useField('song', false);
	const [guessed, setGuessed] = useState(false);

	const isInputCorrect = (): boolean =>
		playlistTrack.track.name.toLowerCase() === song.value.trim().toLowerCase();

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row'
			}}
		>
			{!guessed ? (
				// TODO: make this into another component? too long
				<Paper
					component="form"
					onSubmit={(e: FormEvent) => {
						e.preventDefault();
						setGuessed(true);
					}}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						p: 4,
						paddingBottom: 8,
						width: '500px'
					}}
				>
					<Typography
						variant="h5"
						sx={{
							paddingBottom: '50px'
						}}
					>
						You have one guess!
					</Typography>
					<img
						src={playlistTrack.track.album.images[0].url}
						alt="album_cover"
						width="400px"
						style={{
							filter: 'blur(10px)',
							background: 'linear-gradient(to bottom, transparent, black)',
							opacity: '0.5'
						}}
					/>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							paddingTop: '30px'
						}}
					>
						{' '}
						<TextField
							label="song"
							variant="standard"
							placeholder=""
							{...song.props}
						/>
						<Button type="submit" variant="contained">
							Guess
						</Button>
					</Box>
				</Paper>
			) : (
				<GuessedTrack track={playlistTrack} isCorrect={isInputCorrect()} />
			)}

			<ReactAudioPlayer
				src={playlistTrack.track.preview_url}
				volume={0.3}
				onEnded={() => setGuessed(true)}
				muted={guessed}
				autoPlay
			/>

			<SkipNextButton
				handleClick={() => {
					setGuessed(false);
					if (isInputCorrect()) {
						onCorrect();
					}
					song.reset();
					onNext();
				}}
			/>
		</Box>
	);
};

export default QuizQuestion;
