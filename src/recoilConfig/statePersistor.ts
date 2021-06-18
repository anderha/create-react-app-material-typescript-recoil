import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
	key: 'persisted-state', // this key is using to store data in local storage
	storage: localStorage, // configurate which stroage will be used to store the data
});

export { persistAtom };
