import React, { useEffect } from "react";
import { getAllProducts, getInfoProducts } from "../../action/action";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import ProductItem from "../../components/ProductItem/index";
import axiosService from "../../utils/axiosService";
import { ENDPOINT, GET_PRODUCTS_API } from "../../constant";
import Banner from "../../components/Banner";
import Search from "../Search/index";

export default function HomePage() {
  const dispatch = useDispatch();
  const stateProducts = useSelector((state) => state.products);
  const { products } = stateProducts;
  console.log(products);
  // componentDidMount

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosService.get(`${ENDPOINT}${GET_PRODUCTS_API}`);
      dispatch(getInfoProducts(res.data));
    };
    fetchData();
  }, [dispatch]);

  return (
    <div>
      <Banner />
      <ProductItem />
      <Search />
    </div>
  );
}
