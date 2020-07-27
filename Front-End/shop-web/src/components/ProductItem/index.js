import React, { useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import DetailsItem from "./DetailsItem";
import { useSelector } from "react-redux";
import ItemProducts from "../ItemProducts/index";

export default function ProductItem() {
  const stateProducts = useSelector((state) => state.products);
  const { products } = stateProducts;
  console.log(products);
  
  const DataCategories =  products.filter(product => product.category === "Baby" )
console.log(DataCategories);
  const mappingDataUser = () => DataCategories.map((value, key) => (
    <div className="wrapper-item col">
      <ItemProducts
        key={key}
        image={value.image}
        title={value.name}
        price={value.price}
        percent={value.percent}
      ></ItemProducts>
    </div>
  ))

  return (
    <div>
      <div className="container">
        <div className="row">
          
          {mappingDataUser()}
           
         
        </div>
      </div>
    </div>
  );
}
