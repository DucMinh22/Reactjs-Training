import React from "react";
import { Switch, Route } from "react-router-dom";
import Layout from "../components/LayoutWrapper";
import CategoryPage from "./Categorypage";
import HomePage from "./Homepage";
import CartPage from "./Cartpage";
import Productdetails from "./ProductDetails";
import AdminHompage from "./Admin";
import "antd/dist/antd.css";
import Search from "./Search";
import BillsDetail from "./BillsDetailPage";

function App() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Layout component={HomePage} />} />
      <Route
        path="/category"
        render={() => <Layout component={CategoryPage} />}
      />
      <Route path="/cart" render={() => <Layout component={CartPage} />} />
      <Route path="/search" render={() => <Layout component={Search} />} />
      <Route path="/admin" render={() => <Layout component={AdminHompage} />} />
      <Route
        path="/bills-detail/:id"
        render={() => <Layout component={BillsDetail} />}
      />
      <Route
        path="/ProductsDetail/:id"
        render={() => <Layout component={Productdetails} />}
      />
    </Switch>
  );
}

export default App;
