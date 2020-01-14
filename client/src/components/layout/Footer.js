import React from 'react'
import { NavLink } from 'react-router-dom'
import fbIcon from '../../images/icon_facebook.svg'
import ybIcon from '../../images/icon_social3.png'
import insIcon from '../../images/icon_social2.png'
import ShopLocation from '../../images/Store.svg'
import SignUpEmail from '../element/SignUpEmail'
import logoFooter from '../../images/logo-test.png'

function FooterDetail(props) {
    const { title, detail, social, title_social, email_title } = props;
    return (
        <div className="footer__detail">
            <h2 className="footer__detail__title"> {title} </h2>
            {
                detail.length > 0 && detail.map((item,index) => (
                    <NavLink key={`${index}-footer`} className="footer__detail__nav" to={item.url}>
                        {item.name}
                    </NavLink>
                ))
            } 
            {
                social === true && <h2 className="footer__detail__title"> {title_social} </h2>
            }
            {
                social === true && <div>
                    <a href="/facebook.com/" target="_blank">
                        <img className="footer__detail__social footer__detail__facebook" src={fbIcon} />
                    </a>
                    <a href="/facebook.com/" target="_blank">
                        <img className="footer__detail__social footer__detail__ins" src={insIcon} />
                    </a>
                    <a href="/facebook.com/" target="_blank">
                        <img className="footer__detail__social footer__detail__yb" src={ybIcon} />
                    </a>
                </div>
            }
            {
                email_title !== null && <h2 className="footer__detail__title"> {email_title} </h2>
            }
            {
                email_title !== null && <SignUpEmail />
            }
        </div>
    )
}



function FooterSocial(props) {
    // return (

    // )
}


class Footer extends React.Component {
    constructor(props) {
        super(props);
        
        this.detail_product = [
            {url: "/", name: "Giày nam"},
            {url: "/", name: "Giày nữ"},
            {url: "/", name: "Thời trang & Phụ kiện"},
            {url: "/", name: "Sale-off"}
        ]
    }
    render() {
        return (
            <div className="footer">
                <div className="footer__store">
                    <img className="footer__store__image" src={logoFooter} />
                    <NavLink className="footer__store__find" to="/location">Tìm Cửa Hàng</NavLink>
                </div>
                <FooterDetail title="Sản phẩm" detail={this.detail_product} social={true} title_social="Social" />
                <FooterDetail title="Về chúng tôi" detail={this.detail_product} email_title="Đăng ký nhận thông báo" />
                <FooterDetail title="Hỗ trợ" detail={this.detail_product} />
                <FooterDetail title="Liên hệ" detail={this.detail_product} />
                <div className="footer__copyright">
                    Copyright 2019 - XXXSTORE - All Right Reversed
                </div>
            </div>
        )
    }
}

FooterDetail.defaultProps = {
    detail: [],
    email_title: null
}

export default Footer;