import React, { useState } from 'react'
import { Row, Col, InputNumber, Button, message } from 'antd'
import { Link } from 'react-router-dom'
import { DeleteOutlined, DollarCircleOutlined } from "@ant-design/icons";
import { useDispatch } from 'react-redux';
import { updateCart } from '../../action/action';
import { useTranslation } from 'react-i18next';

export default function CartItem({ product, onPay, onRemove }) {
    const [changeQuantity, setChangeQuantity] = useState([]);
    const [quantity, setQuantity] = useState(product.quantity);
    const dispatch = useDispatch();
    const { t } = useTranslation('common');

    const openChangeQuantity = () => {
        let newChange;
        if (changeQuantity.indexOf(product.id) !== -1) {
            newChange = changeQuantity.filter(item => item !== product.id);
        } else {
            newChange = [...changeQuantity, product.id];
        }
        setQuantity(product.quantity)
        setChangeQuantity(newChange);
    }

    const onChange = (value) => {
        setQuantity(value);
    }

    const addToCart = () => {
        const updatedProduct = {
            ...product,
            quantity: quantity
        }
        message.success("Update to cart successfully");
        console.log('updatedProduct', updatedProduct)
        dispatch(updateCart(updatedProduct));
        openChangeQuantity(product.id)
    }

    return (
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
                                <p>{t(`cartpage.cartItem.name`)}: </p>
                                <p>{t(`cartpage.cartItem.category`)}: </p>
                                <p>{t(`cartpage.cartItem.price`)}: </p>
                                <p>{t(`cartpage.cartItem.quantity`)}: </p>
                            </div>
                        </Col>
                        <Col span={15}>
                            <div className="info__content">
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
                                    <p className="name">{product.name || "No name"}</p>
                                </Link>
                                <p className="category">
                                    {product.category || "No category"}
                                </p>
                                <p className="price">${product.price || "No price"}</p>
                                <div className="quantity">
                                    {
                                        changeQuantity.indexOf(product.id) !== -1
                                            ? <div className="changefield">
                                                <InputNumber
                                                    min={1}
                                                    max={100}
                                                    defaultValue={1}
                                                    value={quantity}
                                                    className="quantity__input"
                                                    onChange={onChange}
                                                />
                                                <p className="quantity__btn" onClick={addToCart}>OK</p>
                                            </div>
                                            : <div className="changefield">
                                                <p className="quantity__text">{product.quantity || "1"}</p>
                                                <p className="quantity__btn" onClick={openChangeQuantity}>{t(`cartpage.cartItem.change`)}</p>
                                            </div>
                                    }
                                </div>
                            </div>
                        </Col>
                        <Col span={5}>
                            <div className="more">
                                <Button
                                    className="delete"
                                    onClick={() => onRemove(product.id)}
                                >
                                    <DeleteOutlined style={{ fontSize: '16px' }} />
                                </Button>
                                <Button
                                    className="delete"
                                    onClick={() => onPay(product)}
                                >
                                    <DollarCircleOutlined style={{ fontSize: '16px' }} />
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
