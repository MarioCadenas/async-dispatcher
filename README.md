# Async Dispatcher for Redux Actions

## Install

```bash
npm install @mariocadenas/async-dispatcher
```

## Usage

> You must configure the dispatcher, so it can use the store.dispatch function. To do that, pass the store to the
> configureDispatcher function.

`configureDispatcher`: function that receives the store object

Example of configuration:

```javascript
// file where you create your store
// ...
import { configureDispatcher } from '@mariocadenas/async-dispatcher';

// ...
// random example of store
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
configureDispatcher(store);

export default store;
```

`mapAsyncDispatch`: `<Object>`

- `error`: Component you want to be shown when an error throws. It gets the error object as parameter.
- `loading`: Component that will be displayed while data is being fetched.
- `actions`: An array of asynchronous actions that your component needs data from. Component will receive
  as props every action so you can call them inside the component to force an update.

> This object does not replace mapDispatchToProps, if you need to call async functions inside your component
> you can still do it. This is only for dispatching asynchronous actions that your component needs data from,
> but is not in the redux store yet.

Example of use:

```javascript
import React from 'react';
import { connect } from 'react-redux';
import asyncDispatch from '@mariocadenas/async-dispatcher';
import { fetchTodos } from '@/actions/todos';
import ToDos from '@/components/todos';

const mapStateToProps = state => ({ todos: state.todos });
const mapAsyncDispatch = {
  error: e => <div>Error!</div>,
  loading: () => <div>Loading...</div>,
  actions: [fetchTodos]
};
const ToDosConnected = connect(mapStateToProps)(ToDos);

export default asyncDispatch(mapAsyncDispatch)(ToDosConnected);
```

```javascript
// @/components/todos

const Todos = props => {
  // Here you can access to loading, error, fetchTodos, todos, any prop you passed.
  // Any asynchronous action will be here too, so you can force an update ignoring the cache
  return <button onClick={props.fetchTodos}>Refetch todos!</button>;
};

export default Todos;
```

While data is being fetched, you will see loading component instead of your component.
Once data is fetched, your component will be able to connect to the store, and get the data itself.

If an error occurs, you will get the error component, it gets the error message, so you can manage it.

You can use this in every component that needs this data, once its fetched, the function call will be cached,
so it doesn't need to call every time a component mounts using this.

## What is this trying to solve?

There are situations where you have 2 components in different routes,
and both depend on the same data. So one of the components should make the call
of the async action. The problem comes when you have an scenario like this

You have a route that displays the component `Todos.js`, this component has a dependency
with a todo-list that you are fetching from your database, for example using an async action
`fetchTodos`, that you have defined in your redux actions.

```
/todos
```

This component could be something like this

```javascript
import React from 'react';
import { connect } from 'react-redux';
import { fetchTodos } from '@/actions/todos';
import ToDos from '@/components/todos';

const mapStateToProps = state => ({
  todos: state.todos
});
const mapDispatchToProps = dispatch => ({
  getTodos: () => dispatch(fetchTodos())
});
const ToDosConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ToDos);

export default ToDosConnected;
```

Now we can fetch inside `Todos` component all the todos.

But now, we also have this route

```
/todos/:id
```

This route lets us see the details of the todo.

The problem is that we have a dependency with the full todo list. So if we reload
the page, we will not have the data. And we will not be able to display the component correctly.

We can solve this by fetching all data in the top component, but that is not efficient.

## TODO

- [ ] Improve documentation
- [ ] Make error and loading properties to be optional, so user can manage them in the component.
