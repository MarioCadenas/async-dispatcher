import React from 'react';
import { connect } from 'react-redux';
import asyncDispatch from '@mariocadenas/async-dispatcher';
import { asyncFetchTodos } from '../../actions/todos';
import TodoList from '../../components/todo-list/TodoList';

const mapStateToProps = state => ({
  todos: state.todos
});

const TodoListConnected = connect(mapStateToProps)(TodoList);
const mapAsyncDispatch = {
  loading: () => <div>Loading...</div>,
  error: e => <div>{e.message}</div>,
  actions: [asyncFetchTodos]
};

export default asyncDispatch(mapAsyncDispatch)(TodoListConnected);
