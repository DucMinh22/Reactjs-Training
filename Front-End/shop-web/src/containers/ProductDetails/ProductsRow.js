import React from "react";
import { Rate, InputNumber, message } from "antd";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../action/action";

export default function ProductRow(props) {
  const dispatch = useDispatch();
  function onChange(value) {
    console.log("changed", value);
  }
  const { image, titleProduct, PriceProduct, description, product } = props;
  return (
    <div>
      <div className="row">
        <div className="col-lg-6 col-md-6 images">
          <img className="img-fluid" src={product.image} alt="" />
        </div>
        <div className="col-lg-6 col-md-6 info-product">
          <h3>{titleProduct} </h3>
          <div className="rate">
            <Rate defaultValue={4} />
            <div className="static-number">(18 reviewers)</div>
          </div>
          <div className="product__details__price">{PriceProduct}đ</div>
          <div className="description">{description}</div>
          <div className="add-to-card">
            <InputNumber
              min={1}
              max={1000000}
              defaultValue={3}
              onChange={onChange}
            />
            <div className="btn-cart">
              {/* < a href="#" className="primary-btn">ADD TO CARD</a> */}
              <Button
                onClick={() => {
                  message.success("Add to cart successfully");
                  dispatch(addToCart(product));
                }}
              >
                ADD TO CARD
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
