import React, { useEffect } from "react";
import { Select, Table, Space, Popconfirm, Button } from "antd";
import { useHistory, useRouteMatch } from "react-router-dom";
import axiosService from "../../utils/axiosService";
import { ENDPOINT, GET_BILL_API } from "../../constant";
import { useDispatch, useSelector } from "react-redux";
import { getProductBills } from "../../action/action";
import moment from "moment";
import { DeleteOutlined } from "@ant-design/icons";

function BillsDetail(props) {
  const dispatch = useDispatch();
  const stateProductsBill = useSelector((state) => state.products);
  const { productsbill } = stateProductsBill;
  console.log(productsbill, "object");
  const { Option } = Select;
  const match = useRouteMatch();
  //   console.log("match :>> ", match);
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
  }, [dispatch]);
  const columns = [
    // {
    //   title: "Number",
    //   dataIndex: "name",
    //   filters: [
    //     {
    //       text: "Joe",
    //       value: "Joe",
    //     },
    //     {
    //       text: "Jim",
    //       value: "Jim",
    //     },
    //     {
    //       text: "Submenu",
    //       value: "Submenu",
    //       children: [
    //         {
    //           text: "Green",
    //           value: "Green",
    //         },
    //         {
    //           text: "Black",
    //           value: "Black",
    //         },
    //       ],
    //     },
    //   ],
    //   // specify the condition of filtering result
    //   // here is that finding the name started with `value`
    //   onFilter: (value, record) => record.name.indexOf(value) === 0,
    //   sorter: (a, b) => a.name.length - b.name.length,
    //   sortDirections: ["descend"],
    // },
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

    // {
    //   title: "Address",
    //   dataIndex: "address",
    //   filters: [
    //     {
    //       text: "London",
    //       value: "London",
    //     },
    //     {
    //       text: "New York",
    //       value: "New York",
    //     },
    //   ],
    //   filterMultiple: false,
    //   onFilter: (value, record) => record.address.indexOf(value) === 0,
    //   sorter: (a, b) => a.address.length - b.address.length,
    //   sortDirections: ["descend", "ascend"],
    // },
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
            {/* <Option value="disabled" disabled>
            Disabled
          </Option> */}
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
