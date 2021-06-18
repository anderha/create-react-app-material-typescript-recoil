export interface Joke {
	id: string;
	url: string;
	value: string;
}

export interface JokesState {
	jokes: Joke[];
	isLoading: boolean;
}
