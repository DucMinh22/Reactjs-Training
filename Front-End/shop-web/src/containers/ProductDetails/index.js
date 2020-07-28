import React, { useEffect, useState } from "react";
import "./index.scss";
import ProductRow from "./ProductsRow";
import { useHistory } from "react-router-dom";
import axiosService from "../../utils/axiosService";
import { ENDPOINT, GET_PRODUCTS_API, GET_CATEGORIES_API } from "../../constant";
import Loading from '../../components/Loading';

export default function Productdetails() {

  const history = useHistory();
  // console.log("history :>> ", history);
  const type = history.location.state.type;
  const id = history.location.state.id;
  const categoryId = history.location.state.categoryId;
  const [product, setProduct] = useState({});
  // const { type, id, categoryId } = history.location.state;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      if (type === "home") {
        const res = await axiosService.get(`${ENDPOINT}${GET_PRODUCTS_API}/${id}`)
        setProduct(res.data)
        setLoading(false);
      } else {
        const res2 = await axiosService.get(`${ENDPOINT}${GET_CATEGORIES_API}/${categoryId}/products/${id}`);
        setProduct(res2.data)
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {loading && <Loading />}
      <div className="container">
        <ProductRow
          image={product.image}
          titleProduct={product.name}
          PriceProduct={product.price}
          description="   Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Proin eget tortor risus."
        />
      </div>
    </div>
  );
}
