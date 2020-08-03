import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "../components/LayoutWrapper";
import CategoryPage from "./Categorypage";
import HomePage from "./Homepage";
import CartPage from "./Cartpage";
import Productdetails from "./ProductDetails";
import AdminHompage from "./Admin";
import SearchPage from "./Searchpage";
import ProductPage from "./Productpage";
import BillsDetail from "./BillsDetailPage";

import "antd/dist/antd.css";

function App() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => localStorage.getItem("role") === "admin" ? <Layout component={AdminHompage} /> : <Layout component={HomePage} />}
      />
      <Route
        path="/category"
        render={() => <Layout component={CategoryPage} />}
      />
      <Route
        path="/cart"
        render={() => <Layout component={CartPage} />}
      />
      <Route
        path="/search"
        render={() => <Layout component={SearchPage} />}
      />
      <Route
        path="/bills-detail/:id"
        render={() => <Layout component={BillsDetail} />}
      />
      <Route
        path="/ProductsDetail/:id"
        render={() => <Layout component={Productdetails} />}
      />
      <Route
        path="/products"
        render={() => <Layout component={ProductPage} />}
      />
    </Switch>
  );
}

export default App;
