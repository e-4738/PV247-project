import { Button, Paper, TextField, Typography } from '@mui/material';
import { FC, useEffect } from 'react';

type Prop = {
	name: string;
};

const Playlist: FC<Prop> = ({ name }) => (
	<Paper sx={{ m: 1, p: 2 }}> {name} </Paper>
);

export default Playlist;
