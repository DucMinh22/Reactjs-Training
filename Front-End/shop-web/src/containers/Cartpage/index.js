import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import { Row, Col, message, Table, Modal } from "antd";
import Button1 from "../../components/Button";
import Loading from "../../components/Loading";
import { removeAllCartProducts, removeFromCart, purchaseProduct, purchaseAllProduct, confirmPurchase } from "../../action/action";
import BreadCrumb from "../../components/Breadcrumb";
import columns from "./cartTableCols";
import CartItem from "./CartItem";
import { useTranslation } from "react-i18next";

export default function CartPage() {
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();
    const cartReducer = useSelector((state) => state.cart);
    const { cartProducts, purchaseProducts, loading } = cartReducer;
    const name = localStorage.getItem('name');
    const { t } = useTranslation('common');

    // render Item for cart
    const renderItemCart = (arr) => {
        return arr.map((product) => (
            <CartItem key={product.id} product={product} onPay={payItemProduct} onRemove={removeItemProducts} />
        ));
    };

    // sum price
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
                {t(`cartpage.totalProducts`)}: {cartProducts.length}
            </p>
            <hr></hr>
            <div className="title">
                <h3>{t(`cartpage.yourCart`)}</h3>
                <Button1
                    disabled={cartProducts?.length === 0}
                    onClick={removeAllProducts}
                >
                    {t(`cartpage.removeAll`)}
                </Button1>
            </div>
            <div className="cartList">
                {cartProducts?.length > 0 ?
                    renderItemCart(cartProducts)
                    :
                    <p>{t(`cartpage.noProducts`)}</p>
                }
            </div>
            <div className="payment">
                <Row>
                    <Col span={12}>
                        <h3>{t(`cartpage.payment`)}</h3>
                    </Col>
                    <Col span={12}>
                        <div className="payment__content">
                            <p>
                                {t(`cartpage.total`)}: <span className="total">$ {total}</span>
                            </p>
                            <Button1 disabled={total === 0} onClick={handlePurchase}>
                                {t(`cartpage.purchaseAll`)}
                            </Button1>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="delivery">
                <div className="delivery__head">
                    <h3>{t(`cartpage.delivery`)}</h3>
                    <Button1 disabled={purchaseProducts.length === 0} onClick={handleOpenModal}>
                        {t(`cartpage.confirmPurchase`)}
                    </Button1>
                </div>
                <Modal
                    title={t(`cartpage.comfirmModal.title`)}
                    visible={visible}
                    okText={t(`cartpage.comfirmModal.title`)}
                    cancelText={t(`cartpage.comfirmModal.cancel`)}
                    onOk={handleConfirmPayment}
                    onCancel={handleOpenModal}
                >
                    <span>{t(`cartpage.comfirmModal.content`)}</span>
                </Modal>
                <Table
                    columns={columns}
                    dataSource={purchaseProducts.map(item => { return { ...item, key: item.id } })}
                />
            </div>
        </div>
    );
}
