import React from 'react'

export default function ItemProducts(props) {
    const { image, title, price, percent, originPrice } = props
    return (
        <div>
            <a href="#">
                <div className="frame">
                    <img src={image} className="img-fluid" alt="" />
                    <div className="title-product">
                        <p>{title}</p>
                    </div>
                    <div className="price">
                        <p>${price}</p>
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


