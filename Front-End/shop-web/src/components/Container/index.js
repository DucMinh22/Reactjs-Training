import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    max-width: 1170px;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
`

const Container = ({ children }) => {
    return (
        <Wrapper>
            {children}
        </Wrapper>
    )
}

export default Container