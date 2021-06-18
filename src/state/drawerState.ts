import { atom } from 'recoil';
import { persistAtom } from '../recoilConfig/statePersistor';
import { AtomIds } from './recoilIdentifiers';

export const drawerState = atom<boolean>({
	key: AtomIds.DRAWER_STATE,
	default: false,
	effects_UNSTABLE: [persistAtom],
});
