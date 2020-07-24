import React from 'react'
import styled from 'styled-components'

const ButtonWrapper = styled.button`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: ${props => props.width || 'fit-content'};
    height: ${props => props.height};
    padding: 13px 30px 12px;
    background-color: #7fad39;
    font-size: 16px;
    font-weight: 800;
    color: #fff;
    cursor: pointer;
    border: none;

    &:hover {
        background-color: #fff;
        color: #7fad39;
        border: 1px solid #7fad39;
    }

    &:focus {
        outline: none;
    }
`

export default function Button({
    children,
    width,
    height,
    style,
    onClick,
    ...rest
}) {
    return (
        <ButtonWrapper onClick={onClick} height={height} width={width} style={style} {...rest}>
            {children}
        </ButtonWrapper>
    )
}
