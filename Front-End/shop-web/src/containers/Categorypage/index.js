import React, { useEffect, useState, useCallback } from 'react'
import { Layout } from 'antd'
import { EuroCircleOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, getProductsByCategory } from '../../action/action';
import './index.scss'
import Loading from '../../components/Loading';
import { useHistory } from 'react-router-dom';

const { Sider, Content } = Layout;

export default function CategoryPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const categoriesState = useSelector(state => state.categories)
    const {
        loading,
        categories
    } = categoriesState;

    const [chosenCategory, setChosenCategory] = useState(() => {
        const categoryName = history.location.state?.chosen;
        return categoryName || "";
    });

    useEffect(() => {
        console.log(`effect 1`)
        dispatch(getAllCategories());
    }, [])

    useEffect(() => {
        if (chosenCategory.length > 0) {
            dispatch(getProductsByCategory(chosenCategory));
        }
    }, [chosenCategory])

    const handleChooseCategory = useCallback((id) => {
        setChosenCategory(id);
    }, [])

    return (
        <div>
            {loading && <Loading />}
            <Layout className="category">
                <Sider className="menu">
                    <p className="menu__title">Categories</p>
                    {
                        categories.map(item => {
                            return (
                                <div className={`${chosenCategory === item.id ? 'menu__item-active' : 'menu__item'}`} key={item.id} onClick={() => handleChooseCategory(item.id)}>
                                    <EuroCircleOutlined style={{ fontSize: '20px', marginRight: '10px' }} />
                                    <span>{item.name}</span>
                                </div>
                            )
                        })
                    }
                </Sider>
                <Layout className="contentWrapper">
                    <Content className="mainContent">Content</Content>
                </Layout>
            </Layout>
        </div>
    )
}
