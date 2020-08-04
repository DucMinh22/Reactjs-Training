import React, { useEffect, useState } from "react";
import { Table, Space, Popconfirm, Input } from "antd";
import {
  getAllBillsID,
  removeBills,
  searchbillsByName,
} from "../../action/action";
import { ENDPOINT, GET_BILL_API } from "../../constant";
import axiosService from "../../utils/axiosService";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { useHistory } from "react-router-dom";

export default function Admin() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { Search } = Input;
  const history = useHistory();
  const stateBills = useSelector((state) => state.products);
  const { bills } = stateBills;

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
  const columns = [
    {
      title: "Bill Code",
      dataIndex: "id",
      defaultSortOrder: "descend",
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
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <div>
      <Search
        placeholder="input search text"
        enterButton="Search"
        size="large"
        onSearch={handleSearch}
        loading={loading}
      />
      <h2 style={{ padding: "30px 0" }}>Bills Code Detail</h2>
      <Table
        onRow={(record, rowIndex) => {
          return {
            onClick: () => {
              const { id } = record;
              handleButtonDetails(id);
            }, // click row
          };
        }}
        columns={columns}
        dataSource={bills}
        onChange={onChange}
      />
      ;
    </div>
  );
}
