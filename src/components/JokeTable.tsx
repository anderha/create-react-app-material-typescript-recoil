// prettier-ignore
import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import {
	useRecoilValue
} from 'recoil';
import { useDeleteJoke } from "../controller/jokesController";
import { Joke } from "../model/joke";
import { jokesRecoilState } from "../state/jokesState";

export function JokeTable() {
	const classes = useStyles();
	const jokesState = useRecoilValue(jokesRecoilState)
	const deleteJoke = useDeleteJoke()

	return (
		<Paper className={classes.paper}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell padding="default">The Joke</TableCell>
						<TableCell padding="default">URL</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{jokesState.jokes.map((joke: Joke) => {
						return (
							<TableRow
								key={joke.id}
								hover
							>
								<TableCell >{joke.value}</TableCell>
								<TableCell padding="none">
									<a href={joke.url} target="_blank">{joke.url}</a>
								</TableCell>
								<TableCell padding="none">
									<IconButton
										aria-label="Delete"
										color="default"
										onClick={() =>
											deleteJoke(joke.id)
										}
									>
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</Paper>
	);
}

const useStyles = makeStyles({
	paper: {
		width: "100%",
		minWidth: 260,
		display: "inline-block",
	},
	table: {
		width: "100%",
	},
});
