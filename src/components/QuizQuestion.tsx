import { Box } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';

import { PlaylistTrack } from '../hooks/usePlaylistsTracks';
import useField from '../hooks/useField';

import GuessedTrack from './GuessedTrack';
import { SkipNextButton } from './MusicButtons';
import QuizTrack from './QuizTrack';

type Prop = {
	playlistTrack: PlaylistTrack;
	onNext: any;
	onCorrect: any;
};

const QuizQuestion: FC<Prop> = ({ playlistTrack, onNext, onCorrect }) => {
	const song = useField('song', false);
	const [guessed, setGuessed] = useState(false);
	const [seconds, setSeconds] = useState<number>(30);

	const isInputCorrect = (): boolean =>
		playlistTrack.track.name.toLowerCase() === song.value.trim().toLowerCase();

	useEffect(() => {
		const interval = setInterval(() => {
			setSeconds(prevSeconds => prevSeconds - 1);
		}, 1000);

		!seconds && setGuessed(true);

		return () => {
			clearInterval(interval);
		};
	}, [seconds]);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row'
			}}
		>
			{!guessed ? (
				<QuizTrack
					onAnswearSubmit={() => setGuessed(true)}
					albumImage={playlistTrack.track.album.images[0].url}
					songField={song}
					seconds={seconds}
				/>
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
					setSeconds(30);
					onNext();
				}}
			/>
		</Box>
	);
};

export default QuizQuestion;
