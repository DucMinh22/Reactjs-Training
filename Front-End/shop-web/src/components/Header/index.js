import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import LOGO from "../../assets/images/logo1.png";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import "./index.scss";
import { Row, Col, Affix, Badge } from "antd";
import { useSelector } from "react-redux";
import Modal from "antd/lib/modal/Modal";
import Login from "./Login";

const MENU = [
  {
    id: 1,
    name: "Home",
    to: "/",
    exact: true,
  },
  {
    id: 2,
    name: "Category",
    to: "/category",
    exact: false,
  },
  {
    id: 3,
    name: "Login",
    to: "#",
    exact: false,
  },
  {
    id: 4,
    name: "Cart",
    to: "/cart",
    exact: false,
  },
];

export default function Header() {
  const [visible, setVisible] = useState(false);
  const history = useHistory();
  const cartReducer = useSelector((state) => state.cart);
  const { cartProducts } = cartReducer;

  const showModal = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
  };
  const handleSignOut = () => {
    localStorage.removeItem("name");
  };
  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Affix>
      <Row className="header">
        <Col span={16}>
          <div className="logo">
            <a href="/">
              <img src={LOGO} className="logo__img" alt="Logo" />
            </a>
          </div>
        </Col>
        <Col span={8}>
          <div className="menu">
            <ul className="menuList">
              {MENU?.map((item) => (
                <li key={item.id}>
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
                    {/* 
                    {item.name !== "Login" && (
                      <div className="sucsessLogin">
                        <div class="toggler Userstyle__UserDropDown-sc-6e6am-5 cVRwHa">
                          <button class="Userstyle__UserDropDownButton-sc-6e6am-10 dYkBsI">
                            Sign out
                          </button>
                        </div>
                      </div>
                    )} */}
                    {/* {localStorage.length > 0 && localStorage.removeItem("name")} */}
                    {/* {className === "cVRwHa" && className === "Logout"
                      ? localStorage.getItem("name")
                      : item.name} */}
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
                                Sign out
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
                                  Sign up
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                        <Modal
                          title="Login"
                          visible={visible}
                          onOk={handleOk}
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
                    classNameName={`${
                      history.location.pathname === item.to ? "hr-active" : "hr"
                    }`}
                  ></div>
                </li>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
    </Affix>
  );
}
