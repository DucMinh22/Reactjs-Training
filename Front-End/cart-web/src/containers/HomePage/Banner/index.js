import React, { useState } from 'react'
import { MenuOutlined, DownOutlined } from '@ant-design/icons'
import Container from '../../../components/Container'
import Button from '../../../components/Button'
import './index.scss'
import { Row, Col } from 'antd'

export default function Banner() {

    const [show, setShow] = useState(false);

    const handleToggleShow = () => {
        setShow(prev => {
            return {
                show: !prev.show,
            }
        })
    }

    console.log('show', show)

    return (
        <div className="banner">
            <Container >
                <Row>
                    <Col span={7}>
                        <div className="selectDepartments">
                            <Button width={'100%'} style={{ padding: '10px 25px 10px 40px' }} onClick={handleToggleShow}>
                                <MenuOutlined style={{ marginRight: '10px' }} />
                                All Departments
                                <DownOutlined style={{ marginLeft: '25px' }} />
                            </Button>
                            <div className="departments">
                                <p>1</p>
                                <p>1</p>
                                <p>1</p>
                                <p>1</p>
                                <p>1</p>
                                <p>1</p>
                            </div>
                        </div>
                    </Col>
                    <Col span={17}>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
