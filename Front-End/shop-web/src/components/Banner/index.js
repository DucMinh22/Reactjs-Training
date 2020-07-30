import React, { useState } from "react";
import "./index.scss";
import { Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import axiosService from "../../utils/axiosService";
import { getInfoProducts, searchProduct } from "../../action/action";
import { useHistory } from "react-router-dom";

export default function Banner() {
  const dispatch = useDispatch();
  const stateSearch = useSelector((state) => state.products);
  const search = stateSearch.searchProducts;
  const history = useHistory();
  const { Search } = Input;

  const handleNavigateSearch = (search) => {
    history.push({
      pathname: `/search`,
      state: { key: search },
    });
  };
  const handleSearch = (value) => {
    console.log("searching.. %o", value);
    axiosService
      .get(
        `https://5c6521b719df280014b6267d.mockapi.io/api/products?search=${value}`
      )
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
        <Search
          placeholder="input search text"
          enterButton="Search"
          size="large"
          onSearch={handleSearch}
        />
      </div>
      <div className="background"></div>
    </div>
  );
}
