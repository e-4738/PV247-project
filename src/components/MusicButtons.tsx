import { Button } from '@mui/material';
import { FC } from 'react';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import StopCircleRoundedIcon from '@mui/icons-material/StopCircleRounded';
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import FastForwardRoundedIcon from '@mui/icons-material/FastForwardRounded';
import FastRewindRoundedIcon from '@mui/icons-material/FastRewindRounded';

type Props = {
	handleClick: () => void;
};

const PlayButton: FC<Props> = ({ handleClick }) => (
	<Button onClick={() => handleClick()}>
		<PlayCircleFilledRoundedIcon />
	</Button>
);

const StopButton: FC<Props> = ({ handleClick }) => (
	<Button onClick={() => handleClick()}>
		<StopCircleRoundedIcon />
	</Button>
);

const PauseButton: FC<Props> = ({ handleClick }) => (
	<Button onClick={() => handleClick()}>
		<PauseCircleFilledRoundedIcon />
	</Button>
);

const SkipNextButton: FC<Props> = ({ handleClick }) => (
	<Button onClick={() => handleClick()}>
		<SkipNextRoundedIcon />
	</Button>
);

const SkipPreviousButton: FC<Props> = ({ handleClick }) => (
	<Button onClick={() => handleClick()}>
		<SkipPreviousRoundedIcon />
	</Button>
);

const FastRewindButton: FC<Props> = ({ handleClick }) => (
	<Button onClick={() => handleClick()}>
		<FastRewindRoundedIcon />
	</Button>
);

const FastBackwardButton: FC<Props> = ({ handleClick }) => (
	<Button onClick={() => handleClick()}>
		<FastForwardRoundedIcon />
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
