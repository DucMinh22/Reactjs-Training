import React from 'react';
import 'antd/dist/antd.css';
import { Switch, Route } from 'react-router-dom';
import Page1 from './Page1';


function App() {
  return (
    <Switch>
      <Route path="/" render={() => <Page1 />}/>
    </Switch>
  );
}

export default App;
