import React, { useMemo, useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import { Row, Col, Button, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Button1 from "../../components/Button";
import Loading from "../../components/Loading";
import { removeAllCartProducts, removeFromCart } from "../../action/action";

export default function CartPage() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const cartReducer = useSelector((state) => state.cart);
  const { cartProducts } = cartReducer;
  let timer;

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [cartProducts]);

    // render Item for cart
    const renderItemCart = (arr) => {
        return arr.map(product => (
            <div className="cartList__item" key={product.id}>
                <Row>
                    <Col span={9}>
                        <img className="itemImg" alt="item1" src={product.image} />
                    </Col>
                    <Col span={15}>
                        <Row className="info">
                            <Col span={4}>
                                <div className="info__field">
                                    <p>Name: </p>
                                    <p>Category: </p>
                                    <p>Price: </p>
                                </div>
                            </Col>
                            <Col span={15}>
                                <div className="info__content">
                                    <p className="name">{product.name || "No name"}</p>
                                    <p className="category">{product.category || "No category"}</p>
                                    <p className="price">${product.price || "No price"}</p>
                                </div>
                            </Col>
                            <Col span={5}>
                                <div className="more">
                                    <Button className="delete" onClick={() =>removeItemProducts(product.id)}>
                                        <DeleteOutlined  />
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        ))
    }

  const total = cartProducts.reduce((total, currentItem) => total + Number.parseInt(currentItem.price), 0);

  const removeItemProducts = useCallback(
    (productid) => {
      dispatch(removeFromCart(productid));
    },
    [cartProducts, dispatch]
  );

  const removeAllProducts = useCallback(() => {
    dispatch(removeAllCartProducts());
  }, [cartProducts, dispatch]);

  const handlePurchase = useCallback(() => {
    setLoading(true);
    timer = setTimeout(() => {
      dispatch(removeAllCartProducts());
      setLoading(false);
      message.success("Purchase Succes !!!");
    }, 1000);
  }, [cartProducts, dispatch]);

  return (
    <div className="cartPage">
      {loading && <Loading />}
      <p style={{ fontWeight: "700" }}>
        Total products in your cart: {cartProducts.length}
      </p>
      <hr></hr>
      <div className="title">
        <h3>Your Cart</h3>
        <Button1
          disabled={cartProducts?.length === 0}
          onClick={removeAllProducts}
        >
          Remove All
        </Button1>
      </div>
      <div className="cartList">
        {cartProducts?.length > 0 ? (
          renderItemCart(cartProducts)
        ) : (
          <p>You don't have any products in your cart</p>
        )}
      </div>
      <div className="payment">
        <Row>
          <Col span={12}>
            <h3>Payment</h3>
          </Col>
          <Col span={12}>
            <div className="payment__content">
              <p>
                Total: <span className="total">$ {total}</span>
              </p>
              <Button1 disabled={total === 0} onClick={handlePurchase}>
                Purchase
              </Button1>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
