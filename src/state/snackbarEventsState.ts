import { atom } from 'recoil';
import { SnackbarEvent } from '../model';
import { persistAtom } from '../recoilConfig/statePersistor';
import { AtomIds } from './recoilIdentifiers';

export const snackbarEventsState = atom<SnackbarEvent[]>({
	key: AtomIds.SNACKBAR_EVENTS_STATE,
	default: [],
	effects_UNSTABLE: [persistAtom],
});
