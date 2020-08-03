import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { MenuOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Drawer, Badge, Select, Modal } from 'antd';
import { NavLink, useHistory } from 'react-router-dom';
import Login from '../Header/Login';
import { MENU } from '../../constant';
import { useTranslation } from 'react-i18next';
import "./index.scss";

function MenuMobile({ handleSignOut, handleSelectLang }) {
    const cartReducer = useSelector(state => state.cart);
    const [visibleDrawer, setVisibleDrawer] = useState(false);
    const [visible, setVisible] = useState(false);
    const { cartProducts } = cartReducer;
    const { t } = useTranslation('common');
    const history = useHistory();

    const handleToggleDrawer = () => {
        setVisibleDrawer(prev => !prev);
    }

    const handleCancel = () => {
        setVisible(false);
    }

    const showModal = () => {
        setVisible(true);
    }

    return (
        <div>
            <MenuOutlined style={{ fontSize: '24px', marginLeft: '20px', cursor: 'pointer', color: "#7fad39" }} onClick={handleToggleDrawer} />
            <Drawer
                className="drawerMenu"
                visible={visibleDrawer}
                closeIcon={false}
                onClose={handleToggleDrawer}
                width="35%"
            >
                <div className="menu">
                    <ul className="menuList">
                        {MENU?.map((item) => (
                            <li
                                key={item.id}
                                id={item.name === "login" ? "login" : ""}
                                style={
                                    localStorage.getItem("name") === "admin"
                                        ? item.isAdmin
                                            ? { display: "block" }
                                            : { display: "none" }
                                        : item.isHome
                                            ? { display: "block" }
                                            : { display: "none" }
                                }
                            >
                                <NavLink
                                    exact={item.exact}
                                    className="menuList__item"
                                    activeClassName="menuList__item-active "
                                    to={item.to}
                                >
                                    {item.name === "login" && localStorage.getItem("name")
                                        ? localStorage.getItem("name")
                                        : t(`menu.${item.name}`)}
                                    {item.name === "login" && (
                                        <div className="itemIcon Login">
                                            <UserOutlined
                                                style={{ fontSize: "20px", marginLeft: "10px" }}
                                            />
                                            <div className="">
                                                <div
                                                    className="loginDropdown"
                                                >
                                                    {localStorage.getItem("name") ? (
                                                        <button
                                                            onClick={handleSignOut}
                                                            class="loginBtn"
                                                        > {t(`signOut`)} </button>
                                                    ) : (
                                                            <>
                                                                <button
                                                                    onClick={showModal}
                                                                    className="loginBtn"
                                                                >{t(`signIn`)}</button>
                                                                <button className="loginBtn">
                                                                    {t(`signUp`)} </button>
                                                            </>
                                                        )}
                                                </div>
                                            </div>
                                            <Modal
                                                title={t(`login`)}
                                                visible={visible}
                                                onCancel={handleCancel}
                                                footer={false}
                                            >
                                                <Login onCancel={handleCancel} />
                                            </Modal>
                                        </div>
                                    )}
                                    {item.name === "cart" && (
                                        <div className="itemIcon">
                                            <Badge
                                                count={cartProducts.length}
                                                style={{ backgroundColor: "#7fad39" }}
                                            >
                                                <ShoppingCartOutlined
                                                    style={{ fontSize: "20px", marginLeft: "10px" }}
                                                />
                                            </Badge>
                                        </div>
                                    )}
                                </NavLink>
                                <div
                                    className={`${
                                        history.location.pathname === item.to ? "hr-active" : "hr"
                                        }`}
                                ></div>
                            </li>
                        ))}
                        <li>
                            <Select onChange={handleSelectLang} defaultValue={localStorage.getItem('i18nextLng')} className="selectLang">
                                <Select.Option value="vi">VI</Select.Option>
                                <Select.Option value="en">EN</Select.Option>
                            </Select>
                        </li>
                    </ul>
                </div>
            </Drawer>
        </div>
    )
}

export default MenuMobile
