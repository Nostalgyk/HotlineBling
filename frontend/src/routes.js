import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewTransaction from './pages/NewTransaction';
import ChangeTransaction from './pages/ChangeTransaction';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/register" component={Register} />

        <Route path="/profile" component={Profile} />
        <Route path="/transactions/new" component={NewTransaction} />
        <Route path="/transactions/change" component={ChangeTransaction} />
      </Switch>
    </BrowserRouter>
  );
}
