# Async Dispatcher for Redux Actions

## Install

```bash
npm install @mariocadenas/async-dispatcher
```

## Usage

First you will need to configure it to be able to access the dispatch function.

So in the file where you are creating your store, just do this

```javascript
// ...reducers, thunk or any imports you have ...
import asyncConnect from '@mariocadenas/async-dispatcher';

// ... any store reducers and configuration
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
asyncConnect.dispatch = store.dispatch;

// ...
```

Now, in any component that is connected to the store and will get data that is
asynchronous, you just need to do this.

```javascript
import React from 'react';
import { connect } from 'react-redux';
import { fetchTodos } from '@/actions/todos';
import ToDos from '@/components/todos';

const mapStateToProps = state => ({
  todos: state.todos
});
const ToDosConnected = connect(mapStateToProps)(ToDos);

const mapAsyncDispatch = dispatch => ({
  error: e => <div>Error!</div>,
  loading: () => <div>Loading...</div>,
  actions: {
    fetchTodos: () => dispatch(fetchTodos())
  }
});

export default asyncConnect(mapAsyncDispatch)(ToDosConnected);
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

- [ ] Make an easy way to update cache, so you can decide when to refetch an action.
- [ ] Improve documentation
- [ ] Make error and loading properties to be optional, so user can manage it in the component.
