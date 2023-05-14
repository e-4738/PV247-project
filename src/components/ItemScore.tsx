import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { FC } from 'react';

type Props = {
	gameScore: number;
	gameMaxScore: number;
};

const ItemScore: FC<Props> = ({ gameScore, gameMaxScore }) => (
	<>
		<Typography
			variant="body1"
			color="secondary"
			sx={{ fontSize: 28, fontWeight: 600 }}
		>
			{gameScore}/{gameMaxScore}
		</Typography>
		<Typography color={grey[500]} variant="overline">
			Score
		</Typography>
	</>
);

export default ItemScore;
