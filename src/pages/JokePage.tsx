import { Button, Grid, Typography } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import { useRecoilValue } from 'recoil';
import { JokeTable } from "../components";
import { useLoadAndAddJoke } from "../controller/jokesController";
import { jokesRecoilState } from "../state/jokesState";

export function JokePage() {
	const classes = useStyles();
	const loadAndAddJoke = useLoadAndAddJoke()
	const jokesState = useRecoilValue(jokesRecoilState)

	return (
		<Grid container className={classes.root}>
			<Grid item xs={6}>
				<Typography variant="h4" gutterBottom>
					Cached Jokes
				</Typography>
			</Grid>
			<Grid item xs={6}>
				<div className={classes.buttonContainer}>
					<Button
						className={classes.button}
						variant="contained"
						color="secondary"
						onClick={loadAndAddJoke}
					>
						{ `Load ${jokesState.jokes.length > 0 ? 'another' : 'a'} Joke`}
					</Button>
				</div>
			</Grid>
			<Grid item xs={12}>
				<JokeTable />
			</Grid>
		</Grid>
	);
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		padding: 20,
		[theme.breakpoints.down("md")]: {
			paddingTop: 50,
			paddingLeft: 15,
			paddingRight: 15,
		},
	},

	buttonContainer: {
		width: "100%",
		display: "flex",
		justifyContent: "flex-end",
	},

	button: {
		marginBottom: 15,
	},
}));
