import React, { useEffect, useState } from "react"
import { Table, Popconfirm, Input, Row, Col } from "antd"
import {
    getAllBillsID,
    removeBills,
    searchbillsByName,
} from "../../action/action"
import { ENDPOINT, GET_BILL_API } from "../../constant"
import axiosService from "../../utils/axiosService"
import { useDispatch, useSelector } from "react-redux"
import {
    DeleteOutlined,
} from "@ant-design/icons"
import moment from "moment"
import { useHistory } from "react-router-dom"
import "./index.scss"
import { useTranslation } from "react-i18next"

export default function Admin() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { Search } = Input;
    const history = useHistory();
    const stateBills = useSelector((state) => state.products);
    const { bills } = stateBills;
    const { t } = useTranslation('common');
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
            dataIndex: "usename",
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
            fixed: "left",
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
    // componentDidMount
    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosService.get(`${ENDPOINT}${GET_BILL_API}`);
            dispatch(getAllBillsID(res.data));
        };
        fetchData();
    }, [dispatch]);

    const handleSearch = (value) => {
        setLoading(true);
        axiosService
            .get(`${ENDPOINT}${GET_BILL_API}?search=${value}`)
            .then((res) => {
                dispatch(searchbillsByName(res.data));
            })
            .catch((error) => {
                console.log("Error fetching and parsing data", error);
            })
            .finally(() => setLoading(false));
    };

    const handleButtonDetails = (id) => {
        history.push({
            pathname: `/bills-detail/${id}`,
        });
    };

    const handleDelete = (id) => {
        axiosService
            .delete(`${ENDPOINT}${GET_BILL_API}/${id}`)
            .then((res) => {
                dispatch(removeBills(res.data.id));
            })
            .catch((error) => console.log(error));
    };

    function onChange(pagination, filters, sorter, extra) {
        console.log("params", pagination, filters, sorter, extra);
    }

    return (
        <div>
            <Row justify="space-between" align="middle">
                <Col span={10}>
                    <h2 style={{ padding: "30px 0" }}>{t(`billpage.title`)}</h2>
                </Col>
                <Col span={10}>
                    <Search
                        placeholder={t(`searchPlaceholder`)}
                        enterButton={t(`search`)}
                        size="large"
                        onSearch={handleSearch}
                        loading={loading}
                    />
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={bills.map(item => ({ ...item, key: item.id }))}
                onChange={onChange}
                rowClassName="bills-row"
            />
      ;
        </div>
    );
}
