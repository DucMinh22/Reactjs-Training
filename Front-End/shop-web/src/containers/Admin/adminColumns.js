import React from 'react';
import {
    DeleteOutlined,
} from "@ant-design/icons"
import moment from "moment"
import { useHistory } from "react-router-dom"
import { Popconfirm } from 'antd';
import { useTranslation } from "react-i18next"
import axiosService from '../../utils/axiosService';
import { ENDPOINT, GET_BILL_API } from '../../constant';
import { useDispatch } from 'react-redux';
import { removeBills } from '../../action/action';

const TableColumns = () => {
    const { t } = useTranslation('common');
    const dispatch = useDispatch();

    const history = useHistory();
    const handleButtonDetails = (id) => {
        history.push({
            pathname: `/bills-detail/${id}`,
        });
    }

    const handleDelete = (id) => {
        axiosService
            .delete(`${ENDPOINT}${GET_BILL_API}/${id}`)
            .then((res) => {
                dispatch(removeBills(res.data.id));
            })
            .catch((error) => console.log(error));
    }


    const columns = [
        {
            title: t(`billpage.table.billCode`),
            dataIndex: "id",
            sorter: (a, b) => a.id - b.id,
            render: (text, record) => {
                return (
                    <div
                        style={{ cursor: "pointer" }}
                        onClick={() => handleButtonDetails(text)}
                    >
                        {record.id}
                    </div>
                );
            },
            width: 25
        },
        {
            title: t(`billpage.table.createdAt`),
            dataIndex: "createdAt",
            render: (text, record) => {
                const time = moment(record.createdAt).format("DD/MM/YYYY");
                return <div onClick={() => handleButtonDetails(record.id)}>{time}</div>;
            },
            width: 100
        },
        {
            title: t(`billpage.table.user`),
            dataIndex: "username",
            width: 150,
            render: (text, record) => <span onClick={() => handleButtonDetails(record.id)}>{text}</span>
        },
        {
            title: t(`billpage.table.bills`),
            dataIndex: "bills",
            render: (text, record) => {
                return <div onClick={() => handleButtonDetails(record.id)}>{record.bills.length}</div>;
            },
            width: 50
        },
        {
            title: t(`billpage.table.status`),
            dataIndex: "status",
            width: 50,
            render: (text, record) => <span onClick={() => handleButtonDetails(record.id)}>{text}</span>
        },
        {
            title: t(`billpage.table.action`),
            width: 25,
            dataIndex: "action",
            key: "action",
            render: (text, record) =>
                record.status === "done" ? (
                    <Popconfirm
                        title="Sure to delete?"
                        onConfirm={() => handleDelete(record.id)}

                    >
                        <DeleteOutlined />
                    </Popconfirm>
                ) : null,
        },
    ];
    return columns
}

export default TableColumns;