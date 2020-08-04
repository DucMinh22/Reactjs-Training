import React, { useEffect, useState, useRef } from 'react'
import Button from '../../components/Button'
import Loading from '../../components/Loading'
import './index.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, getAllCategories, searchProduct } from '../../action/action';
import { Table, Modal, Row, Col, Input } from 'antd';
import TableColumns from './warehouseTableCol';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import ModalInput from '../../components/ModalInput';
import axiosService from '../../utils/axiosService';
import { ENDPOINT, GET_PRODUCTS_API } from '../../constant';
import { CloseOutlined } from '@ant-design/icons';

const { Search } = Input;

export default function WarehousePage() {
    const [visible, setVisible] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [newProduct, setNewProduct] = useState({
        productName: "",
        productCategory: "",
        supplier: "",
        price: 0,
        quantity: 0,
        creaatedAt: ""
    });
    const searchRef = useRef(null);
    const dispatch = useDispatch();
    const productsReducer = useSelector(state => state.products);
    const categoryReducer = useSelector(state => state.categories);
    const { categories } = categoryReducer;
    const { products, loading, searchProducts } = productsReducer;
    const dataTable = () => {
        return isSearching
            ? searchProducts?.length > 0 && searchProducts.map(item => ({ ...item, key: item.id }))
            : products?.length > 0 && products.map(item => ({ ...item, key: item.id }))
    };
    const columns = TableColumns();
    const { t } = useTranslation('common');
    const history = useHistory();
    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getAllCategories());
    }, [dispatch]);

    const handleNavigateDetail = (id) => {
        history.push(`/warehouse-detail/${id}`)
    }

    const handleOpenCloseModal = () => {
        setVisible(prev => !prev)
    }

    const onChangeInput = e => {
        const name = e.target.name;
        const value = e.target.value;

        setNewProduct(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const modalOptions = categories.map(item => ({ ...item, value: item.id }));

    const onChangeSelect = (value) => {
        setNewProduct(prev => {
            return {
                ...prev,
                productCategory: value
            }
        })
    }

    const onSubmitData = () => {
        console.log('newProduct', newProduct)
    }

    const renderModal = () => {
        return (
            <div className="add-new-modal">
                <Row justify="space-between">
                    <Col xl={11} md={10} sm={12}>
                        <ModalInput
                            name="productName"
                            label={t('warehousepage.table.productName')}
                            value={newProduct.productName}
                            placeholder="Input Product's Name"
                            required
                            onChange={onChangeInput}
                        />
                    </Col>
                    <Col xl={11} md={10} sm={12}>
                        <ModalInput
                            type="select"
                            optionSelectValue={modalOptions}
                            name={t('warehousepage.table.productCategory')}
                            label="Product Category"
                            value={newProduct.productCategory}
                            placeholder="Input Product's Category"
                            required
                            onChange={onChangeSelect}
                        />
                    </Col>
                </Row>
                <Row justify="space-between">
                    <Col xl={11} md={10} sm={12}>
                        <ModalInput
                            name="price"
                            label={t('warehousepage.table.price')}
                            value={newProduct.price}
                            placeholder="Input Product's Price"
                            required
                            onChange={onChangeInput}
                        />
                    </Col>
                    <Col xl={11} md={10} sm={12}>
                        <ModalInput
                            name="supplier"
                            label={t('warehousepage.table.supplier')}
                            value={newProduct.supplier}
                            placeholder="Input Product's Supplier"
                            required
                            onChange={onChangeInput}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xl={11} md={10} sm={12}>
                        <ModalInput
                            name="quantity"
                            label={t('warehousepage.table.quantity')}
                            value={newProduct.quantity}
                            placeholder="Input Product's Quantity"
                            required
                            onChange={onChangeInput}
                        />
                    </Col>
                </Row>
            </div>
        )
    }

    const onSearch = (value) => {
        setIsSearching(true)
        axiosService
            .get(`${ENDPOINT}${GET_PRODUCTS_API}?search=${value}`)
            .then((res) => {
                dispatch(searchProduct(res.data));
            })
            .catch((error) => {
                console.log("Error fetching and parsing data", error);
            })
    }

    const clearSearch = () => {
        setIsSearching(false);
        searchRef.current.state.value = "";
    }

    return (
        <div className="warehousepage">
            {loading && <Loading />}
            <div className="content">
                <div className="content__header">
                    <h2>{t(`warehousepage.title`)}</h2>
                </div>
                <Row align="middle" style={{ marginBottom: '20px' }}>
                    <Col span={12}>
                        <div className="searchfield">
                            <Search
                                placeholder={t(`searchPlaceholder`)}
                                enterButton={t(`search`)}
                                size="large"
                                onSearch={onSearch}
                                ref={searchRef}
                            />
                            {isSearching && <Button onClick={clearSearch} style={{ marginLeft: "10px" }}><CloseOutlined /></Button>}
                        </div>
                    </Col>
                    <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={handleOpenCloseModal}>{t(`warehousepage.add`)}</Button>
                    </Col>
                </Row>
                <Modal
                    visible={visible}
                    onOk={onSubmitData}
                    onCancel={handleOpenCloseModal}
                    okText={t(`warehousepage.modal.ok`)}
                    cancelText={t(`warehousepage.modal.cancel`)}
                    closable={false}
                    width={'60%'}
                    title={t(`warehousepage.modal.title`)}
                >
                    {renderModal()}
                </Modal>
                <Table
                    columns={columns}
                    dataSource={dataTable()}
                    rowClassName="warehouse-table-row"
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () => {
                                const { id } = record;
                                handleNavigateDetail(id)
                            }
                        }
                    }}
                />
            </div>
        </div>
    )
}
