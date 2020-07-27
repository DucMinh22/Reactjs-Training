import React, { useEffect } from 'react'
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
import { getAllProducts, getInfoProducts } from '../../action/action'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';
import './index.scss'
import ProductItem from '../../components/ProductItem/index'
import axiosService from '../../utils/axiosService'
import { ENDPOINT, GET_PRODUCTS_API } from '../../constant'

export default function HomePage() {
    const dispatch = useDispatch();
    const stateProducts = useSelector(state => state.products);
    const { products } = stateProducts;

    console.log('state', products)

    // componentDidMount
    useEffect(() => {
        // dispatch(getAllProducts());
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosService.get(`${ENDPOINT}${GET_PRODUCTS_API}`);
            dispatch(getInfoProducts(res.data))
        }
        fetchData();
    }, [dispatch]);

    return (
        <div>
             <Link to="/category"> 
                <Button 
                    style ={{ float : "right", color : '#7fad39', border : '1px solid #7fad39'}}>View more <DoubleRightOutlined /> 
                </Button>
            </Link>
           
            <p>HOME PAGE</p>
            
            <ProductItem />
            <ProductItem />
        </div>
    )
}
