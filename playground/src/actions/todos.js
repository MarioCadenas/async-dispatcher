import { getTodos } from '../data';

export const fetchTodos = todos => ({
  type: 'FETCH_TODOS',
  todos
});

export const asyncFetchTodos = () => dispatch => {
  return getTodos().then(todos => dispatch(fetchTodos(todos)));
};
