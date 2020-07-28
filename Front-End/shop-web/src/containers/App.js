import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from '../components/LayoutWrapper';
import CategoryPage from './Categorypage';
import HomePage from './Homepage';
import CartPage from './Cartpage';
import Productdetails from './ProductDetails';

import 'antd/dist/antd.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Layout component={HomePage} />} />
      <Route path="/category" render={() => <Layout component={CategoryPage} />} />
      <Route path="/cart" render={() => <Layout component={CartPage} />} />
      <Route path="/ProductsDetail" render={() => <Layout component={Productdetails} />} />
    </Switch>
  );
}

export default App;
