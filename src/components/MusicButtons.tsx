import { Button, ButtonPropsVariantOverrides } from '@mui/material';
import { FC } from 'react';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import StopCircleRoundedIcon from '@mui/icons-material/StopCircleRounded';
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import FastForwardRoundedIcon from '@mui/icons-material/FastForwardRounded';
import FastRewindRoundedIcon from '@mui/icons-material/FastRewindRounded';
import { OverridableStringUnion } from '@mui/types';

type Props = {
	handleClick: () => void;
	description?: string;
	variant?:
		| OverridableStringUnion<
				'text' | 'outlined' | 'contained',
				ButtonPropsVariantOverrides
		  >
		| undefined;
};

const PlayButton: FC<Props> = ({ handleClick, description, variant }) => (
	<Button variant={variant} onClick={() => handleClick()}>
		<PlayCircleFilledRoundedIcon fontSize="large" sx={{ pr: 1 }} />
		{description}
	</Button>
);

const StopButton: FC<Props> = ({ handleClick }) => (
	<Button onClick={() => handleClick()}>
		<StopCircleRoundedIcon fontSize="large" />
	</Button>
);

const PauseButton: FC<Props> = ({ handleClick }) => (
	<Button onClick={() => handleClick()}>
		<PauseCircleFilledRoundedIcon fontSize="large" />
	</Button>
);

const SkipNextButton: FC<Props> = ({ handleClick }) => (
	<Button onClick={() => handleClick()}>
		<SkipNextRoundedIcon fontSize="large" />
	</Button>
);

const SkipPreviousButton: FC<Props> = ({ handleClick }) => (
	<Button onClick={() => handleClick()}>
		<SkipPreviousRoundedIcon fontSize="large" />
	</Button>
);

const FastRewindButton: FC<Props> = ({ handleClick }) => (
	<Button onClick={() => handleClick()}>
		<FastRewindRoundedIcon fontSize="large" />
	</Button>
);

const FastBackwardButton: FC<Props> = ({ handleClick }) => (
	<Button onClick={() => handleClick()}>
		<FastForwardRoundedIcon fontSize="large" />
	</Button>
);

export {
	PlayButton,
	StopButton,
	PauseButton,
	SkipNextButton,
	SkipPreviousButton,
	FastRewindButton,
	FastBackwardButton
};
