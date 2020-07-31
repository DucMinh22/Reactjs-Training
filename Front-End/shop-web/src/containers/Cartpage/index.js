import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import { Row, Col, message, Table, Modal } from "antd";
import Button1 from "../../components/Button";
import Loading from "../../components/Loading";
import { removeAllCartProducts, removeFromCart, purchaseProduct, purchaseAllProduct, confirmPurchase } from "../../action/action";
import BreadCrumb from "../../components/Breadcrumb";
import columns from "./cartTableCols";
import Cookies from 'js-cookie';
import CartItem from "./CartItem";

export default function CartPage() {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const cartReducer = useSelector((state) => state.cart);
    const { cartProducts, purchaseProducts, loading } = cartReducer;
    const name = Cookies.get('name');

    // render Item for cart
    const renderItemCart = (arr) => {
        return arr.map((product) => (
            <CartItem key={product.id} product={product} onPay={payItemProduct} onRemove={removeItemProducts} />
        ));
    };

    const total = cartProducts.reduce((total, currentItem) => total + Number.parseInt(currentItem.price) * Number.parseInt(currentItem.quantity), 0);
    // pay one product
    const payItemProduct = useCallback((product) => {
        // dispatch(purchaseProduct(product));

        if (name) {
            dispatch(purchaseProduct(product));
        } else {
            message.error("Please login before purchasing");
        }
    }, [dispatch, name])

    // pay all products
    const handlePurchase = useCallback(() => {
        // dispatch(purchaseAllProduct())

        if (name) {
            dispatch(purchaseAllProduct())
        } else {
            message.error("Please login before purchasing");
        }
    }, [dispatch, name]);

    // confirm reveice products
    const handleConfirmPayment = useCallback(() => {
        dispatch(confirmPurchase());
        setVisible(false);
    }, [dispatch])

    // remove from cart
    const removeItemProducts = useCallback((productid) => {
        dispatch(removeFromCart(productid));
    }, [dispatch]);

    // remove all from cart
    const removeAllProducts = useCallback(() => {
        dispatch(removeAllCartProducts());
    }, [dispatch]);

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
                {cartProducts?.length > 0 ?
                    renderItemCart(cartProducts)
                    :
                    <p>You don't have any products in your cart</p>
                }
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
                    dataSource={purchaseProducts.map(item => { return { ...item, key: item.id } })}
                />
            </div>
        </div>
    );
}
