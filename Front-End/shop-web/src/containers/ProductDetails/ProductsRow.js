import React, { useState } from "react";
import { Rate, InputNumber, message, Modal } from "antd";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { addToCart } from "../../action/action";

export default function ProductRow(props) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [visible, setVisible] = useState(false);
  const { description, product, type } = props;
  const cartProduct = {
    ...product,
    quantity,
    type
  }


  const onChange = (value) => {
    setQuantity(value)
  }

  const toggleModalImg = () => {
    setVisible(prev => !prev)
  }

  return (
    <div>
      <Modal
        visible={visible}
        onCancel={toggleModalImg}
        footer={null}
        closable={false}
      >
        <img className="img-fluid" src={product.image} alt="product_img" />
      </Modal>
      <div className="row">
        <div className="col-lg-6 col-md-6 images">
          <img className="img-fluid" src={product.image} alt="product_img" onClick={toggleModalImg} />
        </div>
        <div className="col-lg-6 col-md-6 info-product">
          <h3>{product.name} </h3>
          <div className="rate">
            <Rate defaultValue={4} />
            <div className="static-number">(18 reviewers)</div>
          </div>
          <div className="product__details__price">{product.price}đ</div>
          <div className="description">{description}</div>
          <div className="add-to-card">
            <InputNumber
              min={1}
              max={100}
              defaultValue={1}
              onChange={onChange}
            />
          </div>
          <div className="btn-cart">
            <Button
              onClick={() => {
                message.success("Add to cart successfully");
                dispatch(addToCart(cartProduct));
              }}
            >
              ADD TO CARD
              </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
