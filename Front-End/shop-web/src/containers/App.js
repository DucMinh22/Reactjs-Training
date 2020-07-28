import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from '../components/LayoutWrapper';
import CategoryPage from './Categorypage';
import HomePage from './Homepage';

import 'antd/dist/antd.css';
import Productdetails from './ProductDetails';


function App() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Layout component={HomePage} />} />
      <Route exact path="/category" render={() => <Layout component={CategoryPage} />} />
      <Route exact path="/ProductsDetail" render={() => <Layout component={Productdetails} />} />
    </Switch>
  );
}

export default App;
