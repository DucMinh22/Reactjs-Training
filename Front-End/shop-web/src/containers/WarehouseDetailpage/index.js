import React, { useEffect } from "react";
import "./index.scss";
import axiosService from "../../utils/axiosService";
import { GET_BILL_API, ENDPOINT, GET_PRODUCTS_API } from "../../constant";
import { Input, Select, Form, Col, Row } from "antd";
import {
  getProductBills,
  getAllProducts,
  getInfoProducts,
} from "../../action/action";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";

function WarehouseDetailPage() {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const { id } = match.params;
  const ProductsDetail = useSelector((state) => state.products);
  const { products } = ProductsDetail;
  console.log(products, "hihih");
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  const { Option, OptGroup } = Select;
  useEffect(() => {
    const fetch = async () => {
      let res = await axiosService.get(`${ENDPOINT}${GET_PRODUCTS_API}/${id}`);
      dispatch(getInfoProducts(res.data));
    };
    fetch();
  }, [dispatch, id]);
  return (
    <div className="warehouse-detail">
      <Form>
        <Row justify="space-between">
          <Col xl={11} md={10} sm={12}>
            <Form.Item
              name={["user", "FirstName"]}
              label="Product Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input name="firstName" value={""} onChange={""} />
            </Form.Item>
          </Col>
          <Col xl={11} md={10} sm={12}>
            <Form.Item
              name={["user", "Sur Name"]}
              label="Price"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input name="surName" value={""} onChange={""} />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="space-between">
          <Col xl={11} md={10} sm={12}>
            <Form.Item
              name={["user", "Sur Name"]}
              label="Quantity"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input name="surName" value={""} onChange={""} />
            </Form.Item>
          </Col>
          <Col xl={11} md={10} sm={12}>
            <Form.Item
              name={["user", "Sur Name"]}
              label="Supplier"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input name="surName" value={""} onChange={""} />
            </Form.Item>
          </Col>
        </Row>
        <Col xl={11} md={10} sm={12}>
          <Select
            defaultValue="lucy"
            style={{ width: 200 }}
            onChange={handleChange}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
          </Select>
        </Col>
      </Form>
    </div>
  );
}

export default WarehouseDetailPage;
