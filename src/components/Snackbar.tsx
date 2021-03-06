// prettier-ignore
import { makeStyles, Snackbar as MuiSnackbar } from '@material-ui/core';
import { Alert } from "@material-ui/lab";
import * as React from "react";
import { useRecoilValue } from 'recoil';
import { useDeleteSnackbarEvent } from '../controller/snackbarEventsController';
import { SnackbarEvent } from "../model/snackbarEvent";
import { snackbarEventsState } from '../state/snackbarEventsState';

export function Snackbar() {
	const classes = useStyles();
	const snackbarEvents: SnackbarEvent[] = useRecoilValue(snackbarEventsState)
	const deleteSnackbarEvent = useDeleteSnackbarEvent()

	const [currentEvent, setCurrentEvent] = React.useState(
		snackbarEvents.length > 0 ? snackbarEvents[0] : undefined
	);

	React.useEffect(() => {
		setCurrentEvent(
			snackbarEvents.length > 0 ? snackbarEvents[0] : undefined
		);
	}, [snackbarEvents]);

	const onClose = (
		event: React.SyntheticEvent | React.MouseEvent,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}
		if (currentEvent) {
			deleteSnackbarEvent(currentEvent);
		}
	};

	if (currentEvent) {
		return (
			<MuiSnackbar
				open={!!currentEvent}
				autoHideDuration={
					currentEvent.severity === "info" ? 2000 : 6000
				}
				onClose={onClose}
				anchorOrigin={{ horizontal: "center", vertical: "top" }}
				transitionDuration={500}
				className={classes.root}
			>
				<Alert
					onClose={onClose}
					severity={currentEvent.severity}
					variant={
						currentEvent.severity === "info" ? "standard" : "filled"
					}
				>
					{currentEvent.message}
				</Alert>
			</MuiSnackbar>
		);
	} else {
		return <></>;
	}
}

const useStyles = makeStyles({
	root: {
		zIndex: 99999999,
	},
});
