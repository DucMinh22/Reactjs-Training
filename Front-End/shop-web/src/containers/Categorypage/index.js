import React, { useEffect, useState, useCallback } from 'react'
import { Layout, Select } from 'antd'
import { EuroCircleOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, getProductsByCategory } from '../../action/action';
import './index.scss'
import Loading from '../../components/Loading';
import { useHistory } from 'react-router-dom';
import ItemProducts from '../../components/ItemProducts';
import Button from '../../components/Button';
import BreadCrumb from '../../components/Breadcrumb';
import { useTranslation } from 'react-i18next';

const { Sider, Content } = Layout;

export default function CategoryPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const categoriesState = useSelector(state => state.categories)
    const {
        loading,
        categories,
        products,
    } = categoriesState;
    const { t } = useTranslation('common');
    const [chosenCategory, setChosenCategory] = useState(() => {
        const categoryName = history.location.state?.chosen;
        return categoryName || 1;
    });
    const [order, setOrder] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [option, setOption] = useState({
        page: 1,
        sortBy: '',
        order: '',
    });


    useEffect(() => {
        dispatch(getAllCategories());
    }, [])

    useEffect(() => {
        if (chosenCategory.length > 0 || chosenCategory) {
            dispatch(getProductsByCategory(chosenCategory, option));
        }
    }, [chosenCategory, option])

    const handleChooseCategory = useCallback((id) => {
        setChosenCategory(id);
        setOption(prevState => {
            return {
                ...prevState,
                page: 1,
                order: "",
                sortBy: "",
            }
        })
        setOrder('');
        setSortBy('')
    }, [])

    const handleLoadMore = () => {
        setOption(prevState => {
            return {
                ...prevState,
                page: prevState.page + 1
            }
        })
    }

    const renderProducts = (arr) => {
        return arr.map(product => {
            return (
                <div className="mainContent__item" key={product.id}>
                    <ItemProducts
                        type="category "
                        id={product.id}
                        key={product.id}
                        image={product.image}
                        title={product.name}
                        price={product.price}
                        percent={product.percent}
                        categoryId={chosenCategory}
                    />
                </div>
            )
        })
    }

    const handleChangeType = useCallback((value) => {
        setSortBy(value);
    }, []);

    const handleChangeOrder = useCallback((value) => {
        setOrder(value)
    }, []);

    const handleSearch = useCallback(() => {

        setOption(prev => {
            return {
                ...prev,
                order: order,
                sortBy: sortBy,
                page: 1,
            }
        })
    }, [option, order, sortBy]);

    const linksBreadCrumb = [
        {
            name: 'Home',
            to: '/'
        },
    ]

    return (
        <div>
            {loading && <Loading />}
            <Layout className="category">
                <Sider className="menu">
                    <p className="menu__title">{t(`categorypage.title`)}</p>
                    {
                        categories.map(item => {
                            return (
                                <div className={`${chosenCategory === Number.parseInt(item.id) ? 'menu__item-active' : 'menu__item'}`} key={item.id} onClick={() => handleChooseCategory(Number.parseInt(item.id))}>
                                    <EuroCircleOutlined style={{ fontSize: '20px', marginRight: '10px' }} />
                                    <span>{t(`categories.${item.name}`)}</span>
                                </div>
                            )
                        })
                    }
                </Sider>
                <Layout className="contentWrapper">
                    <BreadCrumb links={linksBreadCrumb} nameActivePage={'Category'} />
                    <div className="optionField">
                        <div className="optionField__item">
                            <Select style={{ width: 120 }} onChange={handleChangeType} value={sortBy}>
                                <Select.Option value="price">{t(`categorypage.price`)}</Select.Option>
                                <Select.Option value="createdAt">{t(`categorypage.createAt`)}</Select.Option>
                            </Select>
                        </div>
                        <div className="optionField__item">
                            <Select style={{ width: 120 }} onChange={handleChangeOrder} value={order}>
                                <Select.Option value="asc">{t(`categorypage.increment`)}</Select.Option>
                                <Select.Option value="desc">{t(`categorypage.decrement`)}</Select.Option>
                            </Select>
                        </div>
                        <Button onClick={handleSearch}>{t(`search`)}</Button>
                    </div>
                    <Content className="mainContent">
                        {renderProducts(products)}
                    </Content>
                    <div className="loadMoreField">
                        <Button onClick={handleLoadMore} disabled={sortBy && order}>{t(`categorypage.more`)}</Button>
                    </div>
                </Layout>
            </Layout>
        </div>
    )
}
