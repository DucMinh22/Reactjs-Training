import React from 'react';
import { Tag } from 'antd';
import { Link } from 'react-router-dom';

const columns = [
    {
        key: 1,
        title: 'Number',
        dataIndex: 'id',
        width: 50,
    },
    {
        key: 2,
        title: 'Product Name',
        dataIndex: 'name',
        render: (value, record) => {
            return <Link to={{
                pathname: `/ProductsDetail/${record.id}`,
                state: {
                    type: record.type,
                    categoryId: record.categoryId,
                    id: record.id
                }
            }}>{value}</Link>
        },
        width: 200,
    },
    {
        key: 3,
        title: 'Product Category',
        dataIndex: 'category',
        width: 150,
        render: (value, record) => {
            return <p>{value || 'No category'}</p>
        }
    },
    {
        key: 4,
        title: 'Quantity',
        dataIndex: 'quantity',
        width: 100
    },
    {
        key: 5,
        title: 'Status',
        dataIndex: 'status',
        render: (value, record) => {
            return <Tag color="green">{value}</Tag>
        },
        width: 100
    },
]

export default columns;