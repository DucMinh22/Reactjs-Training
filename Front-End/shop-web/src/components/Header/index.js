import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import LOGO from "../../assets/images/logo1.png";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import "./index.scss";
import { searchProduct } from "../../action/action";
import { Row, Col, Affix, Badge, Input, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Modal from "antd/lib/modal/Modal";
import Login from "./Login";
import axiosService from "../../utils/axiosService";
import { ENDPOINT, GET_PRODUCTS_API } from "../../constant";
import { useTranslation } from "react-i18next";
import { MENU } from '../../constant';
import MenuMobile from "../MenuMobile";


export default function Header() {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const cartReducer = useSelector((state) => state.cart);
    const { cartProducts } = cartReducer;
    const { Search } = Input;
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation('common');

    const showModal = () => {
        setVisible(true);
    };
    const handleSignOut = () => {
        window.location.href = "/";
        localStorage.removeItem("name");
        localStorage.removeItem("role");
    };
    const handleCancel = () => {
        setVisible(false);
    };


    const handleNavigateSearch = (search) => {
        history.push({
            pathname: `/search`,
            state: { key: search },
        });
    };
    const handleSearch = (value) => {
        setLoading(true);
        axiosService
            .get(`${ENDPOINT}${GET_PRODUCTS_API}?search=${value}`)
            .then((res) => {
                dispatch(searchProduct(res.data));
                handleNavigateSearch(value);
            })
            .catch((error) => {
                console.log("Error fetching and parsing data", error);
            })
            .finally(() => setLoading(false));
    };

    const handleSelectLang = (value) => {
        i18n.changeLanguage(value);
    }
    return (
        <Affix>
            <Row className="header" align='middle'>
                <Col xl={5} md={10} xs={10} sm={10}>
                    <div className="logo">
                        <a href="/">
                            <img src={LOGO} className="logo__img" alt="Logo" />
                        </a>
                    </div>
                </Col>

                <Col xl={19} md={12} xs={12} sm={12}>
                    <Row align="middle">
                        <Col xl={9} md={24} xs={24} sm={24}>
                            {
                                localStorage.getItem("role") !== "admin" &&
                                <Search
                                    placeholder={t(`searchPlaceholder`)}
                                    enterButton={t(`search`)}
                                    size="large"
                                    onSearch={handleSearch}
                                    loading={loading}
                                />
                            }
                        </Col>
                        <Col xl={15} md={0} xs={0} sm={0}>
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
                                                                        className="loginBtn"
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
                        </Col>
                    </Row>
                </Col>
                <Col xl={0} md={2} xs={2} sm={2}>
                    <MenuMobile
                        handleSelectLang={handleSelectLang}
                        handleSignOut={handleSignOut}
                    />
                </Col>
            </Row>
        </Affix>
    );
}
