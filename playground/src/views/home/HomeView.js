import { connect } from 'react-redux';
import { asyncFetchTodos } from '../../actions/todos';
import asyncDispatch from '@mariocadenas/async-dispatcher';
import React from 'react';

const HomeView = props => {
  console.log('home', props);
  return <button onClick={props.asyncFetchTodos}>Refetch</button>;
};

const mapStateToProps = state => ({
  todos: state.todos
});
const HomeConnected = connect(mapStateToProps)(HomeView);
const mapAsyncDispatch = {
  loading: () => <div>Loading...</div>,
  error: e => <div>{e.message}</div>,
  actions: [asyncFetchTodos]
};

export default asyncDispatch(mapAsyncDispatch)(HomeConnected);
