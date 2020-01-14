import React from 'react'
import TopBar from '../layout/TopBar';
import Menu from '../layout/Menu';
import NotificationCarousel from '../element/NotificationCarousel'

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.carousel_notice_content = [
            {url: "/", content: "BUY MORE PAY LESS - ÁP DỤNG KHI MUA PHỤ KIỆN"},
            {url: "/", content: "Fast Sale 2019 !! "},
            {url: "/", content: "BUY MORE PAY LESS - ÁP DỤNG KHI "}
        ]
    }
    render() {
        return (
            <React.Fragment>
                <TopBar />
                <Menu />
                <NotificationCarousel content={this.carousel_notice_content} />
            </React.Fragment>
        )
    }
}

export default Header;