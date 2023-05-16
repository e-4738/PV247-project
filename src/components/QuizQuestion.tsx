import { Box } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';

import useField from '../hooks/useField';
import { GameTrack } from '../pages/Quiz.tsx';

import GuessedTrack from './GuessedTrack';
import { SkipNextButton } from './MusicButtons';
import QuizTrack from './QuizTrack';

type Prop = {
	gameTrack: GameTrack;
	onNext: any;
	onCorrect: any;
	trackNo: number;
};

const QuizQuestion: FC<Prop> = ({ gameTrack, onNext, onCorrect, trackNo }) => {
	const song = useField('song', false);
	const [guessed, setGuessed] = useState(false);
	const [remainingSeconds, setRemainingSeconds] = useState<number>(30);

	const isInputCorrect = (): boolean =>
		gameTrack.track.name.toLowerCase() === song.value.trim().toLowerCase();

	useEffect(() => {
		const interval = setInterval(() => {
			setRemainingSeconds(prevSeconds => prevSeconds - 1);
		}, 1000);

		!remainingSeconds && setGuessed(true);

		return () => {
			clearInterval(interval);
		};
	}, [remainingSeconds]);

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
					albumImage={gameTrack.track.album.images[0].url}
					songField={song}
					seconds={remainingSeconds}
					trackNo={trackNo}
				/>
			) : (
				<GuessedTrack track={gameTrack} isCorrect={isInputCorrect()} />
			)}

			<ReactAudioPlayer
				src={gameTrack.track.preview_url}
				volume={0.3}
				onEnded={() => setGuessed(true)}
				muted={guessed}
				autoPlay
			/>

			<SkipNextButton
				handleClick={() => {
					setGuessed(false);
					onCorrect(
						isInputCorrect(),
						remainingSeconds >= 25 ? 100 : 100 - 3 * (30 - remainingSeconds - 5)
					);
					song.reset();
					setRemainingSeconds(30);
					onNext();
				}}
			/>
		</Box>
	);
};

export default QuizQuestion;
