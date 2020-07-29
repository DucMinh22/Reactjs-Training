import React, { useEffect } from "react";
import ItemProducts from "../../components/ItemProducts";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import axiosService from "../../utils/axiosService";
import { ENDPOINT, GET_PRODUCTS_API } from "../../constant";
import { getInfoProducts, searchProduct } from "../../action/action";
export default function Search() {
  const dispatch = useDispatch();
  const stateSearch = useSelector((state) => state.products);
  const search = stateSearch.searchProducts;
  console.log("search", search);

  const dataSearch = search.map((item, key) => (
    <div className="wrapper-item">
      <ItemProducts
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
      <h3>Searching result : "làm đẹp"</h3>
      <div className="search-title">
        <h4>Product</h4>
      </div>
      <div className="row">{dataSearch}</div>
    </div>
  );
}
