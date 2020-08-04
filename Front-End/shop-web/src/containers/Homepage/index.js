import React, { useEffect } from "react";
import { getInfoProducts } from "../../action/action";
import { useDispatch } from "react-redux";
import "./index.scss";
import ProductItem from "../../components/ProductItem/index";
import axiosService from "../../utils/axiosService";
import { ENDPOINT, GET_PRODUCTS_API } from "../../constant";
import Banner from "../../components/Banner";

export default function HomePage() {
  const dispatch = useDispatch();
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
    </div>
  );
}
