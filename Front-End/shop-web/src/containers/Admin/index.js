import React, { useEffect, useState } from "react";
import { Table, Space, Popconfirm } from "antd";
import { getAllBills, getAllBillsID, removeBills } from "../../action/action";
import { ENDPOINT, GET_BILL_API } from "../../constant";
import axiosService from "../../utils/axiosService";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import { useHistory } from "react-router-dom";
import BillsDetail from "../BillsDetailPage";

export default function Admin() {
  const [Prbills, setBills] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const stateBills = useSelector((state) => state.products);
  const { bills } = stateBills;
  console.log(bills, "hi");
  // const handleNavigateDetail = () => {
  //   history.push({
  //     pathname: `/ProductsDetail/${id}`,
  //     state: { type, id, categoryId },
  //   });
  // };
  // componentDidMount
  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosService.get(`${ENDPOINT}${GET_BILL_API}`);
      dispatch(getAllBillsID(res.data));
    };
    fetchData();
  }, [dispatch]);

  const handleButtonDetails = (id) => {
    history.push({
      pathname: `/bills-detail/${id}`,
    });
  };
  const handleDelete = (id) => {
    const users = [...Prbills];
    axiosService
      .delete(`${ENDPOINT}${GET_BILL_API}/${id}`)
      .then((res) => {
        console.log(res.data, "dulieudayroi");
        dispatch(removeBills(res.data.id));
        // setBills({
        //     Prbills: Prbills.filter(bill => bill.id !== id),
        // });
      })
      .catch((error) => console.log(error));
  };
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
      title: "Bill Code",
      dataIndex: "id",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.id - b.id,
      render: (text, record) => {
        console.log(record, "dulieu");
        return (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => handleButtonDetails(text)}
          >
            {record.id}
          </div>
        );
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
      dataIndex: "usename",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.usename - b.usename,
    },
    {
      title: "Quantity",
      dataIndex: "bills",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.bills - b.bills,
      render: (text, record) => {
        return <div>{record.bills.length}</div>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Action",
      width: 25,
      dataIndex: "action",
      key: "action",
      fixed: "left",
      render: (text, record) =>
        record.status === "done" ? (
          <Space size="middle">
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.id)}
            >
              <DeleteOutlined />
            </Popconfirm>
          </Space>
        ) : null,
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
      ADMIN
      <Table columns={columns} dataSource={bills} onChange={onChange} />;
    </div>
  );
}
