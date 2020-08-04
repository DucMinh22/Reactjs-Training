import React, { useEffect, useState, useRef } from 'react'
import Button from '../../components/Button'
import Loading from '../../components/Loading'
import './index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, getAllCategories, searchProduct } from '../../action/action'
import { Table, Modal, Row, Col, Input, message } from 'antd';
import TableColumns from './warehouseTableCol'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import ModalInput from '../../components/ModalInput'
import axiosService from '../../utils/axiosService'
import { ENDPOINT, GET_PRODUCTS_API } from '../../constant'
import { CloseOutlined } from '@ant-design/icons'
import * as _ from 'lodash'

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
        createdAt: ""
    });
    const searchRef = useRef(null);
    const dispatch = useDispatch();
    const productsReducer = useSelector(state => state.products);
    const categoryReducer = useSelector(state => state.categories);
    const { categories } = categoryReducer;
    const { products, loading, searchProducts } = productsReducer;
    const dataTable = () => {
        return isSearching
            ? searchProducts?.length > 0 && searchProducts.map(item => ({ ...item, key: item.id })) // fetch search data
            : products?.length > 0 && products.map(item => ({ ...item, key: item.id })) // fetch all data
    };
    const columns = TableColumns();
    const { t } = useTranslation('common');
    const history = useHistory();

    // componentDidMount
    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getAllCategories());
    }, [dispatch]);

    // navigate detail page
    const handleNavigateDetail = (id) => {
        history.push(`/warehouse-detail/${id}`)
    }

    // handle open or close modal
    const handleOpenCloseModal = () => {
        setVisible(prev => !prev)
    }

    // handle change input
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

    // get options for modal
    const modalOptions = categories.map(item => ({ ...item, value: item.id }));

    // handle change select
    const onChangeSelect = (value) => {
        setNewProduct(prev => {
            return {
                ...prev,
                productCategory: value
            }
        })
    }

    // check required
    const isRequired = (name, value) => {
        return _.isEmpty(value)
            ? { [name]: `Please fill all the required input` }
            : {}
    }

    // check type number
    const isTypeNumber = (name, value) => {
        return (typeof value !== 'number')
            ? { [name]: "Must enter number" }
            : {}
    }

    // handle submit data
    const onSubmitData = () => {
        const error = {
            ...isRequired("productName", newProduct.productName),
            ...isRequired("productCategory", newProduct.productCategory),
            ...isRequired("supplier", newProduct.supplier),
            ...isTypeNumber("price", newProduct.price),
            ...isTypeNumber("quantity", newProduct.quantity),
        }

        if (error) {
            const errorMessage = _.uniq(Object.values(error));
            errorMessage.map(item => message.error(item))
        } else {
            const body = {
                ...newProduct,
                createdAt: new Date()
            }
            console.log('newProduct', body)
        }
    }

    // render modal
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

    // handle search
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

    // handle clear search
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
