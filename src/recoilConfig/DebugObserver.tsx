import { useRecoilTransactionObserver_UNSTABLE } from 'recoil';

export const DebugObserver = () => {
	useRecoilTransactionObserver_UNSTABLE(({
		snapshot,
		previousSnapshot
	}) => {
		for (const node of Array.from(snapshot.getNodes_UNSTABLE({isModified: true}))) {
			console.group(`change of state %c${node.key}%c @ ${new Date().toLocaleString()}`, "color: #0000FF")
			console.debug(`%cprevious state:`,"color: #878787; font-weight: bold", previousSnapshot.getLoadable(node).contents)
			console.debug(`%cnext state:    `,"color: #159415; font-weight: bold", snapshot.getLoadable(node).contents)
			console.groupEnd()
		  }
	});

  
	return null;
  }