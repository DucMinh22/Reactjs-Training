import React, { useEffect, useState } from "react";
import "./index.scss";
import ProductRow from "./ProductsRow";
import { useHistory } from "react-router-dom";
import axiosService from "../../utils/axiosService";
import { ENDPOINT, GET_PRODUCTS_API } from "../../constant";
import Loading from "../../components/Loading";

export default function Productdetails() {
  const history = useHistory();
  // console.log("history :>> ", history);
  const type = history.location.state.type;
  const id = history.location.state.id;
  const [product, setProduct] = useState({});
  // const { type, id } = history.location.state;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      if (type === "home") {
        console.log(`go home`);
        const res = await axiosService.get(
          `${ENDPOINT}${GET_PRODUCTS_API}/${id}`
        );
        console.log("res :>> ", res);
        setProduct(res.data);
        setLoading(false);
      } else {
        console.log(`go category`);
      }
    };

    fetchData();
  }, []);

  console.log("product :>> ", product);

  return (
    <div>
      {loading && <Loading />}
      <div className="container">
        <ProductRow
          product={product}
          image={product.image}
          titleProduct={product.name}
          PriceProduct={product.price}
          description="   Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus."
        />
      </div>
    </div>
  );
}
