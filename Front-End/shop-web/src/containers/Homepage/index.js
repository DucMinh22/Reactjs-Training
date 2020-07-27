import React, { useEffect } from 'react'
import { getAllProducts } from '../../action/action'
import { useDispatch, useSelector } from 'react-redux'
import './index.scss'
import ProductItem from '../../components/ProductItem/index'

export default function HomePage() {
    const dispatch = useDispatch();
    const stateProducts = useSelector(state => state.products);
    const { products, loading, error } = stateProducts;

    console.log('state', products)
    console.log('loading', loading)
    console.log('error', error)

    // componentDidMount
    useEffect(() => {
        dispatch(getAllProducts());
    }, [])


    return (
        <div>
            <p>HOME PAGE</p>
            <ProductItem />
        </div>
    )
}
