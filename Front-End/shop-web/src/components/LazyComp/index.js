import React from 'react'
import { Skeleton } from 'antd'
import styled from 'styled-components'

const Lazy = styled.div`
    width: 250px;
    height: 270px;
    padding: 10px;
    background-color: #fefefe;
`

function LazyComponent() {
    return (
        <Lazy>
            <Skeleton active />
        </Lazy>
    )
}

export default LazyComponent
