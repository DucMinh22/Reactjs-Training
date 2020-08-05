import React, { useEffect, useState, useCallback } from "react";
import { Table, Input, Row, Col } from "antd";
import { getAllBillsID, searchbillsByName } from "../../action/action";
import { ENDPOINT, GET_BILL_API } from "../../constant";
import axiosService from "../../utils/axiosService";
import { useDispatch, useSelector } from "react-redux";

import "./index.scss";
import { useTranslation } from "react-i18next";
import TableColumns from "./adminColumns";
import Loading from "../../components/Loading";

export default function Admin() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { Search } = Input;

  const stateBills = useSelector((state) => state.products);
  const { bills } = stateBills;

  const { t } = useTranslation("common");

  // componentDidMount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axiosService.get(`${ENDPOINT}${GET_BILL_API}`);
      dispatch(getAllBillsID(res.data));
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const handleSearch = useCallback(
    (value) => {
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
    },
    [dispatch]
  );

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  const columns = TableColumns();

  return (
    <div>
      {/* {loading && <Loading />} */}
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
        dataSource={bills.map((item) => ({ ...item, key: item.id }))}
        onChange={onChange}
        rowClassName="bills-row"
        loading={loading}
      />
    </div>
  );
}
