import React, { useState, useEffect } from 'react'
import Header from '../Header';
import Container from '../Container';
// import Footer from '../Footer';
import ButtonToTop from '../ButtonTop';

export default function Layout({ component, getProps, ...rest }) {
    const Component = component;
    const [isScroll, setIsScroll] = useState(false);

    const onScroll = (e) => {
        if (window.pageYOffset > 0) {
            setIsScroll(true)
        } else {
            setIsScroll(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll")
        }
    }, [])

    return (
        <Container {...rest}>
            <div id="top"></div>
            <Header />
            <Component {...getProps} />
            {/* <Footer /> */}
            {isScroll && <ButtonToTop />}
        </Container>
    )
}
