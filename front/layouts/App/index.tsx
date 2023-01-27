import React from 'react';
import loadable from '@loadable/component';
import { Redirect, Route, Switch } from 'react-router-dom';

const LogIn = loadable(()=> import('@pages/LogIn'))
const SignUp = loadable(()=> import('@pages/SignUp'))

const App = () => (
  <Switch>
    <Redirect exact path="/" to="/login" />
    <Route path="/login" component={LogIn} />
    <Route path="/signup" component={SignUp} />
  </Switch>
);

export default App;

// jotai, zustand, recoil
