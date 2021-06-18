import { useSetRecoilState } from 'recoil';
import { drawerState } from '../state/drawerState';

export const useCloseDrawer = () => {
	const setDrawerOpen = useSetRecoilState(drawerState);

	return () => setDrawerOpen(false);
};

export const useOpenDrawer = () => {
	const setDrawerOpen = useSetRecoilState(drawerState);

	return () => setDrawerOpen(true);
};
