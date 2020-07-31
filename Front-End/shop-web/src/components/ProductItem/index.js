import React from "react";
import { Button } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./index.scss";
import { useSelector } from "react-redux";
import ItemProducts from "../ItemProducts/index";
import { useTranslation } from "react-i18next";

export default function ProductItem() {
  const stateProducts = useSelector((state) => state.products);
  const { t } = useTranslation('common');
  const { products } = stateProducts;
  const renderData = (categoryId) => {
    const data = products.filter(
      (product) => product.categoryId === categoryId
    );
    return data.map((value, key) => (
      <div className="wrapper-item" key={key}>
        <ItemProducts
          id={value.id}
          image={value.image}
          title={value.name}
          price={value.price}
          percent={value.percent}
          categoryId={value.categoryId}
          type={"home"}
        ></ItemProducts>
      </div>
    ));
  };
  const rederLink = (categoryId) => {
    return (
      <div>
        <Link
          to={{
            pathname: "/category",
            state: { chosen: categoryId },
          }}
        >
          <Button
            style={{
              float: "right",
              color: "#7fad39",
              border: "1px solid #7fad39",
            }}
          >
            {t(`homepage.viewMore`)} <DoubleRightOutlined />
          </Button>
        </Link>

        <div className="row" style={{ width: "100%" }}>
          {renderData(categoryId)}
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className="container">
        <div className="category">
          <h4>{t(`homepage.computer`)}</h4>
          {rederLink(1)}
        </div>
        <div className="category">
          <h4>{t(`homepage.clothing`)}</h4>
          {rederLink(2)}
        </div>
      </div>
    </div>
  );
}
