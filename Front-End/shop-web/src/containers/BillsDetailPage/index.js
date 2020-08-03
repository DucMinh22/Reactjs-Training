import React, { useEffect } from "react";
import { Select, Table, Button } from "antd";
import { useRouteMatch } from "react-router-dom";
import axiosService from "../../utils/axiosService";
import { ENDPOINT, GET_BILL_API } from "../../constant";
import { useDispatch, useSelector } from "react-redux";
import { getProductBills } from "../../action/action";
import moment from "moment";

function BillsDetail(props) {
  const dispatch = useDispatch();
  const stateProductsBill = useSelector((state) => state.products);
  const { productsbill } = stateProductsBill;
  const { Option } = Select;
  const match = useRouteMatch();
  const { id } = match.params;

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  useEffect(() => {
    const fetch = async () => {
      let res = await axiosService.get(`${ENDPOINT}${GET_BILL_API}/${id}`);
      dispatch(getProductBills(res.data));
      console.log(res.data);
    };
    fetch();
  }, [dispatch, id]);

  const columns = [
    {
      title: "No",
      dataIndex: "age",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
    },
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
      sorter: (a, b) => a.age - b.age,
      render: (text, record) => {
        const time = moment(record.createdAt).format("DD/MM/YYYY");
        return <div>{time}</div>;
      },
    },
    {
      title: "UserName",
      dataIndex: "username",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.usename - b.usename,
    },

    {
      title: "Status",
      dataIndex: "status",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <div>
      <div className="User">User Name: {productsbill.username}</div>
      <div className="buyedProducts">Products of Bill :</div>
      <Table
        columns={columns}
        dataSource={productsbill.bills}
        onChange={onChange}
      />
      <div className="row">
        <div className="Status">
          <Select
            defaultValue="Shipping"
            style={{ width: 120 }}
            onChange={handleChange}
          >
            <Option value="Shipping">Shipping</Option>
            <Option value="Incart">InCart</Option>
            <Option value="done">Done</Option>
          </Select>
          <Button
            style={{ marginLeft: "20px" }}
            type="primary"
            htmlType="submit"
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}

export default BillsDetail;
