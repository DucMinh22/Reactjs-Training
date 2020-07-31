import React from "react";
import "./index.scss";
import { Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import axiosService from "../../utils/axiosService";
import { searchProduct } from "../../action/action";
import { useHistory } from "react-router-dom";
import { ENDPOINT, GET_PRODUCTS_API } from "../../constant";
const { Search } = Input;

export default function Banner() {
  const dispatch = useDispatch();
  const stateSearch = useSelector((state) => state.products);
  const search = stateSearch.searchProducts;

  const history = useHistory();

  const handleNavigateSearch = (search) => {
    history.push({
      pathname: `/search`,
      state: { key: search },
    });
  };
  const handleSearch = (value) => {
    axiosService
      .get(`${ENDPOINT}${GET_PRODUCTS_API}?search=${value}`)
      .then((res) => {
        dispatch(searchProduct(res.data));
        handleNavigateSearch(value);
      })
      .catch((error) => {
        console.log("Error fetching and parsing data", error);
      });
  };
  return (
    <div>
      <div className="img-banner">
        <img
          src="https://cf.shopee.vn/file/74428d8977c895ebd49b99b3745eb18e"
          className="img-fruid"
          alt=""
        />
      </div>
      <div className="background"></div>
    </div>
  );
}
