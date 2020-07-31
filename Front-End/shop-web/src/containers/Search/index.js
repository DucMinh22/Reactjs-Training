import React from "react";
import ItemProducts from "../../components/ItemProducts";
import "./index.scss";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
export default function Search() {
  const stateSearch = useSelector((state) => state.products);
  const search = stateSearch.searchProducts;
  const history = useHistory();
  const dataSearch = search.map((item, key) => (
    <div className="wrapper-item">
      <ItemProducts
        type="home"
        key={key}
        id={item.id}
        image={item.image}
        title={item.name}
        price={item.price}
        percent={item.percent}
        categoryId={item.categoryId}
      ></ItemProducts>
    </div>
  ));

  return (
    <div>
      <h3>Searching result : "{history.location.state.key}" </h3>
      <div className="search-title">
        <h4>Products: {search.length}</h4>
      </div>
      <div className="row">{dataSearch}</div>
    </div>
  );
}
