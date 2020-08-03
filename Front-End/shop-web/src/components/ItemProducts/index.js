import React from "react";
import { useHistory } from "react-router-dom";
import "./index.scss";

export default function ItemProducts(props) {
  const { image, title, price, percent, type, id, categoryId } = props;
  const history = useHistory();

  const handleNavigateDetail = () => {
    history.push({
      pathname: `/ProductsDetail/${id}`,
      state: { type, id, categoryId },
    });
  };

  return (
    <div className="frame" onClick={handleNavigateDetail}>
      <img src={image} className="img-fluid" alt={title} />
      <div className="title-product">
        <p>{title}</p>
      </div>
      <div className="price">
        <p>$ {price}</p>
        <p>{percent}%</p>
      </div>
      <div className="origin-price">$ 6.690</div>
    </div>
  );
}
