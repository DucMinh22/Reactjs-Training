import React from 'react';
import { Tag } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const TableColumn = () => {
    const { t } = useTranslation('common');

    const columns = [
        {
            key: 1,
            title: t(`cartpage.table.number`),
            dataIndex: 'id',
            width: 50,
        },
        {
            key: 2,
            title: t(`cartpage.table.productName`),
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
            title: t(`cartpage.table.productCategory`),
            dataIndex: 'category',
            width: 150,
            render: (value, record) => {
                return <p>{value || 'No category'}</p>
            }
        },
        {
            key: 4,
            title: t(`cartpage.table.quantity`),
            dataIndex: 'quantity',
            width: 100
        },
        {
            key: 5,
            title: t(`cartpage.table.status`),
            dataIndex: 'status',
            render: (value, record) => {
                return <Tag color="green">{value}</Tag>
            },
            width: 100
        },
    ]

    return columns
}

export default TableColumn;