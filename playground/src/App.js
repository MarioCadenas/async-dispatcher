import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import AppRouter from './router';
import configureStore from './store';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
