import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../views/home';
import Todos from '../views/todos';
import TodoDetail from '../views/detail';
import Menu from '../components/menu';

const AppRouter = () => {
  return (
    <Router>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/todos" component={Todos} />
      <Route path="/todos/:id" component={TodoDetail} />
    </Router>
  );
};

export default AppRouter;
