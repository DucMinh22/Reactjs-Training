import React from 'react'
import "./index.scss"
import Logo from '../../assets/images/logo.png';
import { NavLink } from 'react-router-dom';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import { Badge, Row, Col } from 'antd';
import Container from '../Container';

export default function Header() {
    return (
        <Container>
            <Row style={{ width: '100%' }} className="header">
                <Col span={5}>
                    <div className="logo">
                        <img className="login__img" src={Logo} alt="Logo" />
                    </div>
                </Col>
                <Col span={14}>
                    <div className="navbar">
                        <ul className="navbar__wrapper">
                            <li>
                                <NavLink className="navbar__item" activeClassName="navbar__item-active" to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink className="navbar__item" activeClassName="navbar__item-active" to="/page">Page</NavLink>
                            </li>
                            <li>
                                <NavLink className="navbar__item" activeClassName="navbar__item-active" to="/blog">Blog</NavLink>
                            </li>
                            <li>
                                <NavLink className="navbar__item" activeClassName="navbar__item-active" to="/contact">Contact</NavLink>
                            </li>
                        </ul>
                    </div>
                </Col>
                <Col span={5}>
                    <div className="cart">
                        <div className="cart__item">
                            <Badge count={25} style={{ backgroundColor: '#7fad39' }} offset={[5, 0]}>
                                <HeartOutlined style={{ fontSize: '25px' }} />
                            </Badge>
                        </div>
                        <div className="cart__item">
                            <Badge count={5} style={{ backgroundColor: '#7fad39' }} offset={[5, 0]}>
                                <ShoppingCartOutlined style={{ fontSize: '25px' }} />
                            </Badge>
                        </div>
                        <div className="cart__price">
                            <span>Item: </span>
                            <span><b> $120</b></span>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
