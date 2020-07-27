import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './Homepage';
import 'antd/dist/antd.css';
import Layout from '../components/LayoutWrapper';

function App() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Layout component={HomePage} />} />
    </Switch>
  );
}

export default App;
