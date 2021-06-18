import { useSetRecoilState } from 'recoil';
import { Joke } from '../model/joke';
import { jokesRecoilState } from '../state/jokesState';
import { useAddSnackbarEvent } from './snackbarEventsController';

export const useDeleteJoke = () => {
	const setJokes = useSetRecoilState(jokesRecoilState);

	return (id: string) =>
		setJokes((currentJokesState) => ({
			...currentJokesState,
			jokes: currentJokesState.jokes.filter((joke) => joke.id !== id),
		}));
};

export const useAddJoke = () => {
	const setJokes = useSetRecoilState(jokesRecoilState);

	return (joke: Joke) =>
		setJokes((currentJokesState) => ({
			...currentJokesState,
			jokes: [...currentJokesState.jokes, joke],
		}));
};

export const useSetJokeIsLoading = () => {
	const setJokes = useSetRecoilState(jokesRecoilState);

	return () =>
		setJokes((currentJokesState) => ({
			...currentJokesState,
			isLoading: true,
		}));
};

export const useSetJokeIsFinishedLoading = () => {
	const setJokes = useSetRecoilState(jokesRecoilState);

	return () =>
		setJokes((currentJokesState) => ({
			...currentJokesState,
			isLoading: false,
		}));
};

export const useLoadAndAddJoke = () => {
	const addJoke = useAddJoke();
	const addSnackbarEvent = useAddSnackbarEvent();
	const setJokeIsFinishedLoading = useSetJokeIsFinishedLoading();
	const setJokeIsLoading = useSetJokeIsLoading();

	return () => {
		setJokeIsLoading();
		loadJoke()
			.then((joke) => {
				addJoke(joke);
				setJokeIsFinishedLoading();
			})
			.catch((e) => {
				addSnackbarEvent({
					severity: 'error',
					message: 'Error loading a joke',
					technicalInfo: e,
				});
				setJokeIsFinishedLoading();
			});
	};
};

const loadJoke = () =>
	new Promise<Joke>((resolve, reject) => {
		fetch('https://api.chucknorris.io/jokes/random')
			.then((response) => {
				if (response.status === 200) {
					resolve(response.json());
				} else {
					reject(response.status);
				}
			})
			.catch((e) => reject(e));
	});
