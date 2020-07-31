import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import LOGO from "../../assets/images/logo1.png";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import "./index.scss";
import { searchProduct } from "../../action/action";
import { Row, Col, Affix, Badge, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Modal from "antd/lib/modal/Modal";
import Login from "./Login";
import Search from "../../containers/Search";
import axiosService from "../../utils/axiosService";
import { ENDPOINT, GET_PRODUCTS_API } from "../../constant";

const MENU = [
  {
    id: 1,
    name: "Home",
    to: "/",
    exact: true,
    isAdmin: false,
  },
  {
    id: 2,
    name: "Category",
    to: "/category",
    exact: false,
    isAdmin: false,
  },
  {
    id: 3,
    name: "Login",
    to: "#",
    exact: false,
    isAdmin: true,
  },
  {
    id: 4,
    name: "Cart",
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

  // if (localStorage.getItem("name")) {
  //   MENU.splice(1, 3);
  // }

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
  return (
    <Affix>
      <Row className="header" align="middle">
        <Col span={5}>
          <div className="logo">
            <a href="/">
              <img src={LOGO} className="logo__img" alt="Logo" />
            </a>
          </div>
        </Col>
        <Col span={19}>
          <Row align="middle">
            <Col span={12}>
              <Search
                placeholder="input search text"
                enterButton="Search"
                size="large"
                onSearch={handleSearch}
              />
            </Col>
            <Col span={12}>
              <div className="menu">
                <ul className="menuList">
                  {MENU?.map((item) => (
                    <li
                      key={item.id}
                      style={
                        localStorage.getItem("name") === "admin"
                          ? item.isAdmin
                            ? { display: "block" }
                            : { display: "none" }
                          : { display: "block" }
                      }
                    >
                      <NavLink
                        id={item.name === "Login" ? "login" : ""}
                        exact={item.exact}
                        className="menuList__item"
                        activeClassName="menuList__item-active "
                        to={item.to}
                      >
                        {item.name === "Login" && localStorage.getItem("name")
                          ? localStorage.getItem("name")
                          : item.name}

                        {item.name === "Login" && (
                          <div className="itemIcon Login">
                            <UserOutlined
                              style={{ fontSize: "20px", marginLeft: "10px" }}
                            />
                            <div className="">
                              <div class="toggler Userstyle__UserDropDown-sc-6e6am-5 cVRwHa">
                                {localStorage.getItem("name") ? (
                                  <button
                                    onClick={handleSignOut}
                                    class="Userstyle__UserDropDownButton-sc-6e6am-10 dYkBsI"
                                  >
                                    {" "}
                                    Sign out{" "}
                                  </button>
                                ) : (
                                  <>
                                    <button
                                      onClick={showModal}
                                      class="Userstyle__UserDropDownButton-sc-6e6am-10 dYkBsI"
                                    >
                                      Sign in
                                    </button>
                                    <button className="Userstyle__UserDropDownButton-sc-6e6am-10 dYkBsI">
                                      Sign up{" "}
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                            <Modal
                              title="Login"
                              visible={visible}
                              onCancel={handleCancel}
                            >
                              <Login onCancel={handleCancel} />
                            </Modal>
                          </div>
                        )}
                        {item.name === "Cart" && (
                          <div classNameName="itemIcon">
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
                          history.location.pathname === item.to
                            ? "hr-active"
                            : "hr"
                        }`}
                      ></div>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Affix>
  );
}
