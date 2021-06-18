import { atom } from 'recoil';
import { JokesState } from '../model/joke';
import { persistAtom } from '../recoilConfig/statePersistor';
import { AtomIds } from './recoilIdentifiers';

export const jokesRecoilState = atom<JokesState>({
	key: AtomIds.JOKES_STATE,
	default: {
		jokes: [],
		isLoading: false,
	},
	effects_UNSTABLE: [persistAtom],
});
