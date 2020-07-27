import React, {useEffect, useState} from 'react'
import './index.scss';
import axios from 'axios';
import DetailsItem from './DetailsItem';

export default function ProductItem() {

    // const [products, setProducts] = useState([]);
    // useEffect(() => {
    //     axios
    //       .get(`https://mockapi.io/projects/5c6521b719df280014b6267e`)
    //       .then((res) => {
    //         const {products} = res;
    //         setProducts(products);
    //       })
    //       .finally(() => {});
    //   }, []);

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="wrapper-item col">
                    <DetailsItem 
                    image="https://salt.tikicdn.com/cache/280x280/ts/product/bc/23/09/76d09086ceaa3d0d9905fe56644e9e9e.jpg" 
                    title="Điện Thoại Xiaomi Mi 8 Lite (4GB / 64GB) - Hàng Chính Hãng" 
                    price="3.090.000 ₫"
                    percent="-54%"
                    />
                    </div>
                    <div className="wrapper-item col">
                    <DetailsItem 
                    image="https://salt.tikicdn.com/cache/280x280/ts/product/72/ab/a5/c94362eccf0b5742d00561d2cff5d72e.jpg" 
                    title="Điện Thoại Xiaomi Mi 8 Lite (4GB / 64GB) - Hàng Chính Hãng" 
                    price="3.090.000 ₫"
                    percent="-54%"
                    />
                    </div>
                    <div className="wrapper-item col">
                    <DetailsItem 
                    image="https://salt.tikicdn.com/cache/280x280/ts/product/3e/59/92/255085a2b9fe9c285cde56eea1d2c6c6.jpg" 
                    title="Điện Thoại Xiaomi Mi 8 Lite (4GB / 64GB) - Hàng Chính Hãng" 
                    price="3.090.000 ₫"
                    percent="-54%"
                    />
                    </div>
                    <div className="wrapper-item col">
                    <DetailsItem 
                    image="https://salt.tikicdn.com/cache/280x280/ts/product/2b/83/af/a0af003b498d3aa871b4b9791f87b0e4.jpg" 
                    title="Điện Thoại Xiaomi Mi 8 Lite (4GB / 64GB) - Hàng Chính Hãng" 
                    price="3.090.000 ₫"
                    percent="-54%"
                    />
                    </div>
                </div>
            </div>    
        </div>
    )
}
