import React, { useEffect, useState } from "react";
import { Select, Table, Button } from "antd";
import { useRouteMatch } from "react-router-dom";
import axiosService from "../../utils/axiosService";
import { ENDPOINT, GET_BILL_API } from "../../constant";
import { useDispatch, useSelector } from "react-redux";
import { getProductBills, updateStateBills } from "../../action/action";
import moment from "moment";

function BillsDetail(props) {
  const dispatch = useDispatch();
  const stateProductsBill = useSelector((state) => state.products);
  const { productsbill } = stateProductsBill;
  const [statusbill, setStatusbills] = useState("");

  const { Option } = Select;
  const match = useRouteMatch();
  const { id } = match.params;

  const isChange = (value) => {
    setStatusbills(value);
  };
  const UpdateStateBill = () => {
    const body = {
      ...productsbill,
      status: statusbill,
    };
    axiosService.put(`${ENDPOINT}${GET_BILL_API}/${id}`, body).then((res) => {
      dispatch(updateStateBills(res.data));
      console.log(res);
    });
  };
  useEffect(() => {
    const fetch = async () => {
      let res = await axiosService.get(`${ENDPOINT}${GET_BILL_API}/${id}`);
      dispatch(getProductBills(res.data));
      setStatusbills(res.data.status);
    };
    fetch();
  }, [dispatch, id]);

  const columns = [
    {
      title: "Product Code",
      dataIndex: "id",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.id - b.id,
      render: (text, record) => {
        return <div style={{ cursor: "pointer" }}>{record.id}</div>;
      },
    },
    {
      title: "CreateAt",
      dataIndex: "createdAt",
      defaultSortOrder: "descend",
      render: (text, record) => {
        const time = moment(record.createdAt).format("DD/MM/YYYY");
        return <div>{time}</div>;
      },
    },
    {
      title: "Product Name",
      dataIndex: "name",
      defaultSortOrder: "descend",
    },
    {
      title: "Category",
      dataIndex: "category",
      defaultSortOrder: "descend",
    },
    {
      title: "Price",
      dataIndex: "price",
      defaultSortOrder: "descend",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      defaultSortOrder: "descend",
    },

    {
      title: "Status",
      dataIndex: "status",
      defaultSortOrder: "descend",
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <div>
      <div className="buyedProducts">
        <h2>Products of Bill :</h2>
        <h6>Bill: {productsbill.username}</h6>{" "}
      </div>
      <Table
        columns={columns}
        dataSource={productsbill.bills}
        onChange={onChange}
      />
      <div className="row">
        <div className="Status">
          <Select
            // defaultValue="Shipping"
            style={{ width: 120 }}
            // onChange={handleChange}
            value={statusbill}
            onChange={(event) => isChange(event)}
          >
            <Option value="Shipping">Shipping</Option>
            <Option value="Incart">InCart</Option>
            <Option value="done">Done</Option>
          </Select>
          <Button
            style={{ marginLeft: "20px" }}
            type="primary"
            htmlType="submit"
            onClick={UpdateStateBill}
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BillsDetail;
