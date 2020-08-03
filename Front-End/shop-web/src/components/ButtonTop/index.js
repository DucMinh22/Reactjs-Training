import React from 'react'
import styled from 'styled-components'
import { ArrowUpOutlined } from '@ant-design/icons'

const BackTop = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #fff;
    background-color: #7fad39;
    border: none;
    position: fixed;
    bottom: 20px;
    right: 50px;
    box-shadow: 0 15px 53px 0 #111;
    &:focus {
        outline: none
    }
`

export default function ButtonToTop() {
    const handleGotoTop = () => {
        const top = document.querySelector("#top");
        if (top) {
            top.scrollIntoView({
                behavior: "smooth",
                block: "end",
                inline: "nearest"
            })
        }
    }

    return (
        <BackTop onClick={handleGotoTop}>
            <ArrowUpOutlined style={{ fontSize: '24px' }} />
        </BackTop>
    )
}
