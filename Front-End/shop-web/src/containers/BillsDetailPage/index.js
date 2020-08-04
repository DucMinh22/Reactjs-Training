import React, { useEffect, useState } from "react"
import { Select, Table, Button, message } from "antd"
import { useRouteMatch } from "react-router-dom"
import axiosService from "../../utils/axiosService"
import { ENDPOINT, GET_BILL_API } from "../../constant"
import { useDispatch, useSelector } from "react-redux"
import { getProductBills, updateStateBills } from "../../action/action"
import Loading from '../../components/Loading'
import moment from "moment"
import "./index.scss"
import { useTranslation } from "react-i18next"
const { Option } = Select;

function BillsDetail() {
    const dispatch = useDispatch();
    const stateProductsBill = useSelector((state) => state.products);
    const { productsbill } = stateProductsBill;
    const [statusbill, setStatusbills] = useState("");
    const [loading, setLoading] = useState(false);
    const match = useRouteMatch();
    const { t } = useTranslation('common');
    const { id } = match.params;

    useEffect(() => {
        setLoading(true);
        const fetch = async () => {
            let res = await axiosService.get(`${ENDPOINT}${GET_BILL_API}/${id}`);
            dispatch(getProductBills(res.data));
            setStatusbills(res.data.status);
            setLoading(false)
        };
        fetch();
    }, [dispatch, id]);

    const isChange = (value) => {
        setStatusbills(value);
    };
    const updateStateBill = () => {
        const body = {
            ...productsbill,
            status: statusbill,
        };
        axiosService.put(`${ENDPOINT}${GET_BILL_API}/${id}`, body).then((res) => {
            dispatch(updateStateBills(res.data));
            message.success("Updated successfully !!!")
        });
    };

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

    function onChange(pagination, filters, sorter, extra) {
        console.log("params", pagination, filters, sorter, extra);
    }

    return (
        <div>
            {loading && <Loading />}
            <div className="buyedProducts">
                <h2>{t(`billDetailPage.title`)}</h2>
            </div>
            <div className="info">
                <div className="info-detail">
                    <p>{t(`billDetailPage.user`)}: {productsbill.username}</p>
                    <p>{t(`billDetailPage.total`)}: </p>
                </div>
                <div className="Status">
                    <Select
                        style={{ width: 120 }}
                        value={statusbill}
                        onChange={(event) => isChange(event)}
                    >
                        <Option value="Shipping">{t(`billDetailPage.select.shipping`)}</Option>
                        <Option value="Incart">{t(`billDetailPage.select.inCart`)}</Option>
                        <Option value="done">{t(`billDetailPage.select.done`)}</Option>
                    </Select>
                    <Button
                        style={{ marginLeft: "20px" }}
                        type="primary"
                        htmlType="submit"
                        onClick={updateStateBill}
                    >{t(`billDetailPage.update`)}</Button>
                </div>
            </div>
            <Table
                columns={columns}
                dataSource={productsbill.bills?.map(item => ({ ...item, key: item.id }))}
                onChange={onChange}
            />

        </div>
    );
}

export default BillsDetail;
