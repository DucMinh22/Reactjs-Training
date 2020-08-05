import React from 'react';
import moment from "moment"
import { useTranslation } from "react-i18next"

const TableColumns = () => {
    const { t } = useTranslation('common');

    const columns = [
        {
            title: t(`billDetailPage.table.number`),
            dataIndex: "id",
            sorter: (a, b) => a.id - b.id,
            render: (text, record) => {
                return <div style={{ cursor: "pointer" }}>{record.id}</div>;
            },
        },
        {
            title: t(`billDetailPage.table.date`),
            dataIndex: "createdAt",
            render: (text, record) => {
                const time = moment(record.createdAt).format("DD/MM/YYYY");
                return <div>{time}</div>;
            },
        },
        {
            title: t(`billDetailPage.table.productName`),
            dataIndex: "name",
        },
        {
            title: t(`billDetailPage.table.productCategory`),
            dataIndex: "category",
        },
        {
            title: t(`billDetailPage.table.price`),
            dataIndex: "price",
        },
        {
            title: t(`billDetailPage.table.quantity`),
            dataIndex: "quantity",
        }
    ];

    return columns
}

export default TableColumns