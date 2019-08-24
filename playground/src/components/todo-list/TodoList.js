import React from 'react';
import PropTypes from 'prop-types';
import Todo from '../todo';

const TodoList = ({ todos, ...props }) => {
  console.log(props);
  return (
    <>
      <button onClick={props.asyncFetchTodos}>Refetch</button>
      <ul>
        {todos.map(todo => (
          <Todo key={todo.id} {...todo} />
        ))}
      </ul>
    </>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string
    }).isRequired
  ).isRequired
};

export default TodoList;
