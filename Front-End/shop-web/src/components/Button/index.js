import React from 'react'
import styled from "styled-components";

const ButtonWrapper = styled.button`
    padding: 10px 24px;
    background-color: #7fad39;
    border: none;
    color: #fff;
    font-weight: 700;
    
    &:focus {
        outline: none;
    }

    &:disabled {
        background-color: gray;
    }
`

export default function Button({ children, onClick, style, disabled, ...rest }) {
    return (
        <ButtonWrapper onClick={onClick} style={style} {...rest} disabled={disabled}>
            {children}
        </ButtonWrapper>
    )
}
