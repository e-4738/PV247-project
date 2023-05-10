import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { FC, FormEvent } from 'react';

type Prop = {
	onAnswearSubmit: () => void;
	albumImage: string;
	songField: any;
	seconds: number;
};

const QuizTrack: FC<Prop> = ({
	onAnswearSubmit,
	albumImage,
	songField,
	seconds
}) => {
	console.log('debug');

	return (
		<Paper
			component="form"
			onSubmit={(e: FormEvent) => {
				e.preventDefault();
				onAnswearSubmit();
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
			<Typography variant="h4">Name the song</Typography>
			<Typography
				variant="subtitle1"
				sx={{
					paddingBottom: '50px'
				}}
			>
				Remaining Time: {seconds}s
			</Typography>
			<img
				src={albumImage}
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
				<TextField
					label="song"
					variant="standard"
					placeholder=""
					{...songField.props}
				/>
				<Button type="submit" variant="contained">
					Guess
				</Button>
			</Box>
		</Paper>
	);
};

export default QuizTrack;
