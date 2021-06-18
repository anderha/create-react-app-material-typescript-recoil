// prettier-ignore
import { Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/styles";
import * as React from "react";
import {
	useRecoilValue
} from 'recoil';
import { useCompleteTodo, useDeleteTodo, useUncompleteTodo } from "../controller/todosController";
import { Todo } from "../model/index";
import { todosState } from "../state/todosState";

export function TodoTable() {
	const classes = useStyles();
	const todos = useRecoilValue(todosState)
	const uncompleteTodo = useUncompleteTodo()
	const completeTodo = useCompleteTodo()
	const deleteTodo = useDeleteTodo()

	const onRowClick = (todo: Todo) => {
		if (todo.completed) {
			uncompleteTodo(todo.id);
		} else {
			completeTodo(todo.id);
		}
	};

	return (
		<Paper className={classes.paper}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell padding="default">Completed</TableCell>
						<TableCell padding="default">Text</TableCell>
						<TableCell padding="default">Delete</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{todos.map((n: Todo) => {
						return (
							<TableRow
								key={n.id}
								hover
								onClick={event => onRowClick(n)}
							>
								<TableCell padding="none">
									<Checkbox checked={n.completed} />
								</TableCell>
								<TableCell padding="none">{n.text}</TableCell>
								<TableCell padding="none">
									<IconButton
										aria-label="Delete"
										color="default"
										onClick={() =>
											deleteTodo(n.id)
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
