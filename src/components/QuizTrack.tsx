import {
	Box,
	Button,
	LinearProgress,
	Paper,
	TextField,
	Typography
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { color } from '@mui/system';
import { FC, FormEvent } from 'react';

type Prop = {
	onAnswearSubmit: () => void;
	albumImage: string;
	songField: any;
	seconds: number;
	trackNo: number;
};

const normalize = (value: number, min = 0, max = 30) =>
	((value - min) * 100) / (max - min);

const QuizTrack: FC<Prop> = ({
	onAnswearSubmit,
	albumImage,
	songField,
	seconds,
	trackNo
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
			<Typography
				variant="h6"
				fontWeight="bold"
				color={grey[300]}
				sx={{ pb: 8 }}
			>
				Track {trackNo}/10
			</Typography>
			<img
				src={albumImage}
				alt="album_cover"
				width="250px"
				style={{
					filter: 'blur(35px)',
					background: 'linear-gradient(to bottom, transparent, black)',
					opacity: '0.5'
				}}
			/>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					paddingTop: '70px',
					pb: 2
				}}
			>
				<LinearProgress
					variant="determinate"
					value={normalize(seconds)}
					sx={{
						width: '250px',
						minWidth: '100%',
						height: '12px',
						borderRadius: '30px'
					}}
				/>
				<Typography color={grey[600]} variant="caption" sx={{ pt: 1 }}>
					Remaining Time: {seconds} sec
				</Typography>
			</Box>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 1
				}}
			>
				<TextField
					variant="outlined"
					label="Track Title"
					placeholder="Look What You Made Me Do"
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
