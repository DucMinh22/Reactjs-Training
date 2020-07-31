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

const MENU = [
    {
        id: 1,
        name: "home",
        to: "/",
        exact: true,
        isAdmin: false,
    },
    {
        id: 2,
        name: "category",
        to: "/category",
        exact: false,
        isAdmin: false,
    },
    {
        id: 3,
        name: "login",
        to: "#",
        exact: false,
        isAdmin: true,
    },
    {
        id: 4,
        name: "cart",
        to: "/cart",
        exact: false,
        isAdmin: false,
    },
];

export default function Header() {
    const [visible, setVisible] = useState(false);
    const history = useHistory();
    const cartReducer = useSelector((state) => state.cart);
    const { cartProducts } = cartReducer;
    const { Search } = Input;
    const dispatch = useDispatch();
    const stateSearch = useSelector((state) => state.products);
    const search = stateSearch.searchProduct;
    const { t, i18n } = useTranslation('common');

    const showModal = () => {
        setVisible(true);
    };
    const handleSignOut = () => {
        localStorage.removeItem("name");
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
        axiosService
            .get(`${ENDPOINT}${GET_PRODUCTS_API}?search=${value}`)
            .then((res) => {
                dispatch(searchProduct(res.data));
                handleNavigateSearch(value);
            })
            .catch((error) => {
                console.log("Error fetching and parsing data", error);
            });
    };

    const handleSelectLang = (value) => {
        i18n.changeLanguage(value);
    }
    return (
        <Affix>
            <Row className="header" align='middle'>
                <Col span={5}>
                    <div className="logo">
                        <a href="/">
                            <img src={LOGO} className="logo__img" alt="Logo" />
                        </a>
                    </div>
                </Col>

                <Col span={19}>
                    <Row align="middle">
                        <Col span={9}>
                            <Search
                                placeholder={t(`searchPlaceholder`)}
                                enterButton={t(`search`)}
                                size="large"
                                onSearch={handleSearch}
                            />
                        </Col>
                        <Col span={15}>
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
                                                    : { display: "block" }
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
                                                                className="toggler Userstyle__UserDropDown-sc-6e6am-5 cVRwHa"
                                                            >
                                                                {localStorage.getItem("name") ? (
                                                                    <button
                                                                        onClick={handleSignOut}
                                                                        class="Userstyle__UserDropDownButton-sc-6e6am-10 dYkBsI"
                                                                    > {t(`signOut`)} </button>
                                                                ) : (
                                                                        <>
                                                                            <button
                                                                                onClick={showModal}
                                                                                className="Userstyle__UserDropDownButton-sc-6e6am-10 dYkBsI"
                                                                            >{t(`signIn`)}</button>
                                                                            <button className="Userstyle__UserDropDownButton-sc-6e6am-10 dYkBsI">
                                                                                {t(`signUp`)} </button>
                                                                        </>
                                                                    )}
                                                            </div>
                                                        </div>
                                                        <Modal
                                                            title="Login"
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
                                        <Select onChange={handleSelectLang} defaultValue={localStorage.getItem('i18nextLng')}>
                                            <Select.Option value="vi">VI</Select.Option>
                                            <Select.Option value="en">EN</Select.Option>
                                        </Select>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Affix>
    );
}
