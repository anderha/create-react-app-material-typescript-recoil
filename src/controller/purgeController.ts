import { useResetRecoilState } from 'recoil';
import { drawerState } from '../state/drawerState';
import { snackbarEventsState } from '../state/snackbarEventsState';
import { todosState } from '../state/todosState';

export const usePurgeState = () => {
	const resetDrawerState = useResetRecoilState(drawerState);
	const resetTodosState = useResetRecoilState(todosState);
	const resetSnackbarEventsState = useResetRecoilState(snackbarEventsState);

	return () => {
		resetDrawerState();
		resetTodosState();
		resetSnackbarEventsState();
	};
};
