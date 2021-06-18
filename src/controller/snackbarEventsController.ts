import { useSetRecoilState } from 'recoil';
import { SnackbarEvent } from '../model';
import { snackbarEventsState } from '../state/snackbarEventsState';

export const useAddSnackbarEvent = () => {
	const setSnackbarEvents = useSetRecoilState(snackbarEventsState);

	return (event: SnackbarEvent) => setSnackbarEvents((currentEvents) => [...currentEvents, event]);
};

export const useDeleteSnackbarEvent = () => {
	const setSnackbarEvents = useSetRecoilState(snackbarEventsState);

	return (event: SnackbarEvent) =>
		setSnackbarEvents((currentEvents) => currentEvents.filter((e) => e.message !== event.message));
};
