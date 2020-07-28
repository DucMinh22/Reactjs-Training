import React, { useEffect, useState } from "react";
import { Button } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import "./index.scss";
import axios from "axios";
import DetailsItem from "./DetailsItem";
import { useSelector } from "react-redux";
import ItemProducts from "../ItemProducts/index";

export default function ProductItem() {
  const stateProducts = useSelector((state) => state.products);
  const { products } = stateProducts;

  const renderData = (categoryId) => {
    const data = products.filter(product => product.categoryId === categoryId);
    return data.map((value, key) => (
      <div className="wrapper-item col">
        <ItemProducts
          key={key}
          id={value.id}
          image={value.image}
          title={value.name}
          price={value.price}
          percent={value.percent}
          type={'home'}
        ></ItemProducts>
      </div>
    ))
  }

  return (
    <div>
      <div className="container">
        <div className="category">
          <h4>Computers</h4>
          <Link to={{
            pathname: '/category',
            state: { chosen: 2 }
          }}>
            <Button
              style={{ float: "right", color: '#7fad39', border: '1px solid #7fad39' }}>View more <DoubleRightOutlined />
            </Button>
          </Link>
          <div className="row" style={{ width: '100%' }}>
            {renderData(2)}
          </div>
        </div>
        <div className="category">
          <h4>Clothing</h4>
          <Link to={{
            pathname: '/category',
            state: { chosen: 7 }
          }}>
            <Button
              style={{ float: "right", color: '#7fad39', border: '1px solid #7fad39' }}>View more <DoubleRightOutlined />
            </Button>
          </Link>
          <div className="row" style={{ width: '100%' }}>
            {renderData(7)}
          </div>
        </div>
      </div>
    </div>
  );
}
