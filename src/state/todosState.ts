import { atom } from 'recoil';
import { Todo } from '../model';
import { persistAtom } from '../recoilConfig/statePersistor';
import { AtomIds } from './recoilIdentifiers';

export const todosState = atom<Todo[]>({
	key: AtomIds.TODOS_STATE,
	default: [],
	effects_UNSTABLE: [persistAtom],
});
