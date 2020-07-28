import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import LOGO from '../../assets/images/logo1.png'

import './index.scss'
import { Row, Col } from 'antd'

const MENU = [
    {
        id: 1,
        name: 'Home',
        to: '/',
        exact: true,
    },
    {
        id: 2,
        name: 'Category',
        to: '/category',
        exact: false,
    },
    {
        id: 3,
        name: 'Cart',
        to: '/cart',
        exact: false,
    },
]

export default function Header() {
    const history = useHistory();

    return (
        <Row className="header">
            <Col span={16}>
                <div className="logo">
                    <a href='/'><img src={LOGO} className="logo__img" alt="Logo" /></a>
                </div>
            </Col>
            <Col span={8}>
                <div className="menu">
                    <ul className="menuList">
                        {MENU?.map(item =>
                            <li key={item.id}>
                                <NavLink exact={item.exact} className="menuList__item" activeClassName="menuList__item-active" to={item.to}>
                                    {item.name}
                                </NavLink>
                                <div className={`${history.location.pathname === item.to ? 'hr-active' : 'hr'}`}></div>
                            </li>
                        )}
                    </ul>
                </div>
            </Col>
        </Row>
    )
}
