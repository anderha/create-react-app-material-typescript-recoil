import { useSetRecoilState } from 'recoil';
import { Todo } from '../model';
import { todosState } from '../state/todosState';

export const useAddTodo = () => {
	const setTodos = useSetRecoilState(todosState);

	return (todo: Todo) => setTodos((currentTodos) => [...currentTodos, todo]);
};

export const useCompleteTodo = () => {
	const setTodos = useSetRecoilState(todosState);

	return (id: number) =>
		setTodos((currentTodos) => currentTodos.map((todo) => (todo.id === id ? { ...todo, completed: true } : todo)));
};

export const useUncompleteTodo = () => {
	const setTodos = useSetRecoilState(todosState);

	return (id: number) =>
		setTodos((currentTodos) => currentTodos.map((todo) => (todo.id === id ? { ...todo, completed: false } : todo)));
};

export const useDeleteTodo = () => {
	const setTodos = useSetRecoilState(todosState);

	return (id: number) => setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
};
