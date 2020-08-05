import React from 'react'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
const TableColumns = () => {
    const { t } = useTranslation('common');
    const columns = [
        {
            key: 1,
            title: t('warehousepage.table.number'),
            dataIndex: 'id',
            width: 50,
        },
        {
            key: 2,
            title: t('warehousepage.table.productName'),
            dataIndex: 'name',
            width: 200,
        },
        {
            key: 3,
            title: t('warehousepage.table.productCategory'),
            dataIndex: 'category',
            sorter: (a, b) => a.category.localeCompare(b.category),
            width: 150,
        },
        {
            key: 4,
            title: t('warehousepage.table.supplier'),
            dataIndex: 'supplier',
            width: 150,
        },
        {
            key: 5,
            title: t('warehousepage.table.price'),
            dataIndex: 'price',
            width: 100,
        },
        {
            key: 6,
            title: t('warehousepage.table.quantity'),
            dataIndex: 'quantity',
            width: 50,
        },
        {
            key: 7,
            title: t('warehousepage.table.date'),
            dataIndex: 'createdAt',
            width: 50,
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            render: (value, record) => {
                return (
                    <span>{moment(value).format('DD/MM/YYYY')}</span>
                )
            }
        },
    ]

    return columns
}

export default TableColumns;