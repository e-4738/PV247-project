import { Paper, Typography, Box } from '@mui/material';
import { grey } from '@mui/material/colors';
import { FC, useState } from 'react';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ReactAudioPlayer from 'react-audio-player';

import { GameTrack } from './Quiz.tsx';
import { PauseButton, PlayButton } from './MusicButtons.tsx';

type Prop = {
	position: number;
	gameTrack: GameTrack;
};

const TrackDetail: FC<Prop> = ({ position, gameTrack }) => {
	const [play, setPlay] = useState(false);
	return (
		<Box
			sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
		>
			<Typography
				variant="body1"
				color={grey[600]}
				sx={{ fontSize: 18, fontWeight: 600 }}
			>
				Track no. #{position}
			</Typography>
			<Paper
				sx={{
					width: '212px',
					height: '350px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'flex-end',
					borderRadius: '12px 12px 8px 8px',
					backgroundColor: gameTrack.result ? 'darkgreen' : 'darkred',
					zIndex: 1
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						height: '12%',
						width: '100%',
						pt: '5px'
					}}
				>
					{gameTrack.result ? (
						<CheckCircleRoundedIcon fontSize="large" />
					) : (
						<CancelRoundedIcon fontSize="large" />
					)}
				</Box>

				<Paper
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						height: '88%',
						width: '100%',
						borderRadius: '24px 24px 8px 8px',
						zIndex: 2
					}}
				>
					<Typography
						variant="overline"
						textAlign="center"
						width={190}
						whiteSpace="nowrap"
						textOverflow="ellipsis"
						overflow="hidden"
						sx={{ fontSize: 12, fontWeight: 700, pb: 3, pt: 1 }}
					>
						{gameTrack.track.album.name}
					</Typography>
					<img
						src={gameTrack.track.album.images[0]?.url}
						alt="album_cover"
						width="112px"
					/>
					<Typography
						variant="body2"
						textAlign="center"
						width={190}
						whiteSpace="nowrap"
						textOverflow="ellipsis"
						overflow="hidden"
						sx={{ fontSize: 18, fontWeight: 600, ml: 2, pt: 2, pb: 3 }}
					>
						{gameTrack.track.name}
					</Typography>
					<Typography
						variant="body2"
						textAlign="center"
						width={190}
						whiteSpace="nowrap"
						textOverflow="ellipsis"
						overflow="hidden"
						color={grey[500]}
						sx={{ fontSize: 16, fontWeight: 400, pb: 3 }}
					>
						{gameTrack.track.artists[0]?.name}
					</Typography>
					<ReactAudioPlayer
						src={gameTrack.track.preview_url}
						volume={0.3}
						onEnded={() => setPlay(false)}
						muted={!play}
						autoPlay={false}
					/>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'end',
							height: '100%',
							pb: 1
						}}
					>
						{play ? (
							<PlayButton handleClick={() => setPlay(true)} />
						) : (
							<PauseButton handleClick={() => setPlay(false)} />
						)}
					</Box>
				</Paper>
			</Paper>
		</Box>
	);
};

export default TrackDetail;
