import React from 'react'
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";

export default function ItemProducts(props) {
    const { image, title, price, percent, type, id, categoryId } = props
    return (
        <div>
            <a href="#">
                <div className="frame">
                    <Link to={{
                        pathname: "/ProductsDetail",
                        state: { type, id, categoryId }
                    }}>
                        <img src={image} className="img-fluid" alt="" />
                    </Link>
                    <div className="title-product">
                        <p>{title}</p>
                    </div>
                    <div className="price">
                        <p>$ {price}</p>
                        <p2>{percent}%</p2>
                    </div>
                    <div className="origin-price">
                        6.690.000 ₫
                    </div>
                </div>
            </a>
        </div>
    )
}


