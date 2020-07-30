import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import { Row, Col, Button, message, Table, Modal } from "antd";
import { DeleteOutlined, DollarCircleOutlined } from "@ant-design/icons";
import Button1 from "../../components/Button";
import Loading from "../../components/Loading";
import { removeAllCartProducts, removeFromCart, purchaseProduct, purchaseAllProduct, confirmPurchase } from "../../action/action";
import BreadCrumb from "../../components/Breadcrumb";
import { Link } from "react-router-dom";
import columns from "./cartTableCols";
import Cookies from 'js-cookie';

export default function CartPage() {
  // const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const cartReducer = useSelector((state) => state.cart);
  const { cartProducts, purchaseProducts, loading } = cartReducer;
  const name = Cookies.get('name');

  // render Item for cart
  const renderItemCart = (arr) => {
    return arr.map((product) => (
      <div className="cartList__item" key={product.id}>
        <Row>
          <Col span={9}>
            <Link
              to={{
                pathname: `/ProductsDetail/${product.id}`,
                state: {
                  id: product.id,
                  categoryId: product.categoryId,
                  type: product.type,
                },
              }}
            >
              <img className="itemImg" alt="item1" src={product.image} />
            </Link>
          </Col>

          <Col span={15}>
            <Row className="info">
              <Col span={4}>
                <div className="info__field">
                  <p>Name: </p>
                  <p>Category: </p>
                  <p>Price: </p>
                  <p>Quantity: </p>
                </div>
              </Col>
              <Col span={15}>
                <div className="info__content">
                  <p className="name">{product.name || "No name"}</p>
                  <p className="category">
                    {product.category || "No category"}
                  </p>
                  <p className="price">${product.price || "No price"}</p>
                  <p className="price">{product.quantity || "1"}</p>
                </div>
              </Col>
              <Col span={5}>
                <div className="more">
                  <Button
                    className="delete"
                    onClick={() => removeItemProducts(product.id)}
                  >
                    <DeleteOutlined style={{fontSize: '16px'}}/>
                  </Button>
                  <Button
                    className="delete"
                    onClick={() => payItemProduct(product)}
                  >
                    <DollarCircleOutlined style={{fontSize: '16px'}}/>
                  </Button>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    ));
  };

  const total = cartProducts.reduce((total, currentItem) =>total + Number.parseInt(currentItem.price) *Number.parseInt(currentItem.quantity),0);
  // pay one product
  const payItemProduct = useCallback((product) => {
    if(name) {
      dispatch(purchaseProduct(product));
    } else {
      message.error("Please login before purchasing");
    }
  }, [cartProducts, dispatch])

  // pay all products
  const handlePurchase = useCallback(() => {
    if(name) {
      dispatch(purchaseAllProduct())
    } else {
      message.error("Please login before purchasing");
    }
  }, [cartProducts, dispatch]);

  // confirm reveice products
  const handleConfirmPayment = useCallback(() => {
      dispatch(confirmPurchase());
      setVisible(false);
  }, [purchaseProducts, dispatch])

  // remove from cart
  const removeItemProducts = useCallback((productid) => {
      dispatch(removeFromCart(productid));
    },[cartProducts, dispatch]);

  // remove all from cart
  const removeAllProducts = useCallback(() => {
    dispatch(removeAllCartProducts());
  }, [cartProducts, dispatch]);

  const handleOpenModal = () => {
    setVisible(prev => !prev);
  }

  const linksBreadCrumb = [
    {
      name: "Home",
      to: "/",
    },
  ];

  return (
    <div className="cartPage">
      {loading && <Loading />}
      <BreadCrumb links={linksBreadCrumb} nameActivePage={"Cart"} />
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
                Purchase All
              </Button1>
            </div>
          </Col>
        </Row>
      </div>
      <div className="delivery">
          <div className="delivery__head">
            <h3>Delivery</h3>
            <Button1 disabled={purchaseProducts.length === 0} onClick={handleOpenModal}>
                  Confirm Purchase
            </Button1>
          </div>
          <Modal
            title={`Confirm`}
            visible={visible}
            okText="Confirm"
            onOk={handleConfirmPayment}
            onCancel={handleOpenModal}
          >
            <span>Do you want to confirm your payment?</span>
          </Modal>
          <Table 
            columns={columns}
            dataSource={purchaseProducts.map(item => {return {...item, key: item.id}})}
          />
      </div>
    </div>
  );
}
