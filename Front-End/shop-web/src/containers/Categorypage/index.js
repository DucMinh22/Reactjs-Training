import React, { useEffect, useState, useCallback } from 'react'
import { Layout } from 'antd'
import { EuroCircleOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, getProductsByCategory } from '../../action/action';
import './index.scss'
import Loading from '../../components/Loading';
import { useHistory } from 'react-router-dom';
import ItemProducts from '../../components/ItemProducts';

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

    const [chosenCategory, setChosenCategory] = useState(() => {
        const categoryName = history.location.state?.chosen;
        return categoryName || "";
    });

    useEffect(() => {
        dispatch(getAllCategories());
    }, [])

    useEffect(() => {
        if (chosenCategory.length > 0 || chosenCategory) {
            dispatch(getProductsByCategory(chosenCategory));
        }
    }, [chosenCategory, categories])

    const handleChooseCategory = useCallback((id) => {
        setChosenCategory(id);
    }, [])

    const renderProducts = (arr) => {
        return arr.map(product => {
            return (
                <ItemProducts
                    key={product.id}
                    image={product.image}
                    title={product.name}
                    price={product.price}
                    percent={product.percent}
                />
            )
        })
    }

    return (
        <div>
            {loading && <Loading />}
            <Layout className="category">
                <Sider className="menu">
                    <p className="menu__title">Categories</p>
                    {
                        categories.map(item => {
                            return (
                                <div className={`${chosenCategory === Number.parseInt(item.id) ? 'menu__item-active' : 'menu__item'}`} key={item.id} onClick={() => handleChooseCategory(Number.parseInt(item.id))}>
                                    <EuroCircleOutlined style={{ fontSize: '20px', marginRight: '10px' }} />
                                    <span>{item.name}</span>
                                </div>
                            )
                        })
                    }
                </Sider>
                <Layout className="contentWrapper">
                    <Content className="mainContent">
                        {renderProducts(products)}
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}
