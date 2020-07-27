import React from 'react'
import Header from '../Header';
import Container from '../Container';
import Footer from '../Footer';

export default function Layout({ component, getProps, ...rest }) {
    const Component = component;
    return (
        <Container {...rest}>
            <Header />
            <Component {...getProps} />
            <Footer />
        </Container>
    )
}
