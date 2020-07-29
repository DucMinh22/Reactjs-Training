import React from 'react'
import { Breadcrumb } from 'antd'
import './index.scss'
import { Link } from 'react-router-dom';

const { Item } = Breadcrumb;

export default function BreadCrumb({ links, nameActivePage, ...rest }) {
    return (
        <div className="breadCrumbContainer">
            <Breadcrumb {...rest} >
                {
                    links.map((item, index) => {
                        return (
                            <Item key={index}>
                                <Link to={item.to}>{item.name}</Link>
                            </Item>
                        )
                    })
                }
                <Item>{nameActivePage}</Item>
            </Breadcrumb>
        </div>
    )
}
