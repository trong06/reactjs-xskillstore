import React from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown,faChevronRight } from '@fortawesome/free-solid-svg-icons'
import logo from '../../images/logo-test.png'
import ThumbnailIMG from '../../images/thumbnail.png'
import DisCoverYou from '../../images/DiscoverYOU.svg'
import MenuNam from '../../images/Menu_Nam.jpg'
import MenuNu from '../../images/Menu_Nu.jpg'
import MenuPK from '../../images/Menu_Phu-kien.jpg'
import MenuSale from '../../images/Menu_Sale-off.jpg'
import BarsMenu from '../../images/menu.svg'
import CancelMenu from '../../images/cancel.svg'

// For desktop
function SubMenuChoose(props) {
    const { image, children, url } = props;
    return (
        <div className="submenu__choose__option">
            <img 
            className="submenu__choose__option__image" 
            src={image}/>
            <h3 className="submenu__choose__option__title">
                <NavLink className="submenu__choose__option__title__child" to={url}>
                    {
                        children
                    }
                </NavLink>
            </h3>
        </div>
    )
}

function BoxItems(props) {
    const {title, listItems} = props;
    return (
        <div className="submenu__items__box">
            <h3 className="submenu__items__box__title">{ title }</h3>
            {
                listItems.map((item, index) => (
                    <NavLink key={`${index}-box-items-menu`} style={item.style} className={`submenu__items__box__item`} to={`${item.url}`}>
                        {item.name}
                    </NavLink>
                ))
            }
        </div>
    )
}

function SubMenuItems(props) {
    const { title_1, title_2, title_3, listItems_1, listItems_2, listItems_3, style } = props;
    return (
        <div className="submenu__items">
            <BoxItems title={title_1} listItems={listItems_1} />
            <BoxItems title={title_2} listItems={listItems_2} />
            <BoxItems title={title_3} listItems={listItems_3} />
        </div>
    )
}

//For Responsive
function SubItemsMobile(props) {
    const { items, style } = props;

    return (
        <div style={style} className="menu__responsive__item__submenu">
            {
                Array.isArray(items) && items.map((item,index) => (
                    <ItemMobile key={`${index}-subitemsmobile-menu`} url={item.url} name={item.name} style={item.style} />
                ))
            }
        </div>
    )
}

function ItemMobile(props) {
    const { url, name, style } = props;
    return (
        <NavLink style={style} className="menu__responsive__item menu--fs-sm" to={url}>
            <span style={{float: "left"}}> {style ? "-" : "+"} </span>
            {`${name}`}
        </NavLink>
    )
}

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleShow: false,
            toggleItem: false
        }
        this.menu = {
            sanpham: [
                {url: "/product-list?gender=0", name: "Cho nam"},
                {url: "/product-list?gender=1", name: "Cho nữ"},
                {url: "/", name: "Outlet sale"},
                {url: "/", name: "Cho sale"}  
            ],
            nam: {
                listItems_1: [
                    {url: "#", name: "Best Seller"},
                    {url: "#", name: "New Arrival"},
                    {url: "#", name: "Sale Off"},
                ],
                listItems_2: [
                    {url: "#", name: "Dòng sản phẩm", style: {fontWeight: "bold"}},
                    {url: "#", name: "Basas"},
                    {url: "#", name: "Vintas"},
                    {url: "#", name: "Urbas"},
                    {url: "#", name: "Pattas"},
                    {url: "#", name: "Style", style: {fontWeight: "bold", marginTop: "8px"}},
                    {url: "#", name: "High Top"},
                    {url: "#", name: "Low Top"},
                    {url: "#", name: "Clip-On"},
                    {url: "#", name: "Tất cả giày"}
                ],
                listItems_3: [
                    {url: "#", name: "Nữa trên", style: {fontWeight: "bold"}},
                    {url: "#", name: "Basic Tee"},
                    {url: "#", name: "Graphic Tee"},
                    {url: "#", name: "Phụ kiện", style: {fontWeight: "bold", marginTop: "8px"}},
                    {url: "#", name: "Nón"},
                    {url: "#", name: "Dây giày"},
                    {url: "#", name: "Vớ"},
                ]   
            },
            nu: {
                listItems_1: [
                    {url: "#", name: "Best Seller"},
                    {url: "#", name: "New Arrival"},
                    {url: "#", name: "Sale Off"},
                ],
                listItems_2: [
                    {url: "#", name: "Dòng sản phẩm", style: {fontWeight: "bold"}},
                    {url: "#", name: "Basas"},
                    {url: "#", name: "Vintas"},
                    {url: "#", name: "Urbas"},
                    {url: "#", name: "Pattas"},
                    {url: "#", name: "Style", style: {fontWeight: "bold", marginTop: "8px"}},
                    {url: "#", name: "High Top"},
                    {url: "#", name: "Low Top"},
                    {url: "#", name: "Clip-On"},
                    {url: "#", name: "Tất cả giày"}
                ],
                listItems_3: [
                    {url: "#", name: "Nữa trên", style: {fontWeight: "bold"}},
                    {url: "#", name: "Basic Tee"},
                    {url: "#", name: "Graphic Tee"},
                    {url: "#", name: "Phụ kiện", style: {fontWeight: "bold", marginTop: "8px"}},
                    {url: "#", name: "Nón"},
                    {url: "#", name: "Dây giày"},
                    {url: "#", name: "Vớ"},
                ]   
            }
        }

        this.onToggleMenuMobile = this.onToggleMenuMobile.bind(this);
    }

    onToggleMenuMobile() {
        this.setState({
            toggleShow: !this.state.toggleShow
        });
    }

    render() {
        return(
            <div className="menu">
                <NavLink to="/">
                    <img className="menu__image" src={logo} />
                </NavLink>
                <div className="menu__nav">
                    <div className="menu__nav__link" to="#">
                        Sản Phẩm 
                        <FontAwesomeIcon className="menu__nav__link__icon" icon={faChevronDown} />
                        <div className="submenu">
                            <div className="submenu__choose">
                                <SubMenuChoose image={ThumbnailIMG} url="/product-list?gender=0">Cho Nam</SubMenuChoose>
                                <SubMenuChoose image={ThumbnailIMG} url="/product-list?gender=1">Cho Nữ</SubMenuChoose>
                                <SubMenuChoose image={ThumbnailIMG} url="/">Outlet Sale</SubMenuChoose>
                                <SubMenuChoose image={ThumbnailIMG} url="/">Cho Sale</SubMenuChoose>
                            </div>
                        </div>
                    </div>
                    <div className="menu__nav__link" to="#">
                        Nam 
                        <FontAwesomeIcon className="menu__nav__link__icon" icon={faChevronDown} />
                        <div className="submenu">
                            <SubMenuItems 
                            title_1="Nỗi bật" 
                            title_2="Giày" 
                            title_3="Thời trang & Phụ Kiện" 
                            listItems_1={this.menu.nam.listItems_1}
                            listItems_2={this.menu.nam.listItems_2}
                            listItems_3={this.menu.nam.listItems_3} />
                        </div>
                    </div>
                    <div className="menu__nav__link" to="#">
                        Nữ 
                        <FontAwesomeIcon className="menu__nav__link__icon" icon={faChevronDown} />
                        <div className="submenu">
                        <SubMenuItems 
                            title_1="Nỗi bật" 
                            title_2="Giày" 
                            title_3="Thời trang & Phụ Kiện" 
                            listItems_1={this.menu.nu.listItems_1}
                            listItems_2={this.menu.nu.listItems_2}
                            listItems_3={this.menu.nu.listItems_3} />
                        </div>
                    </div>
                    <NavLink className="menu__nav__link" to="/maintenance">
                        SALE OFF
                    </NavLink>
                    <NavLink className="menu__nav__link" to="/maintenance">
                        <img className="mav__nav__link__image" src={DisCoverYou} />
                    </NavLink>
                </div>
                <form className="menu__form">
                    <input className="menu__form__search" type="text" placeholder="Tìm kiếm giày . . ." />
                </form>
                <img onClick={this.onToggleMenuMobile} src={BarsMenu} className="menu__bars" />
                <div className={`menu__responsive ${this.state.toggleShow ? "menu--active" : ""}`}>
                    <a className="menu__responsive__item">
                        <img onClick={this.onToggleMenuMobile} src={CancelMenu} className="menu__responsive__item__cancel" />
                    </a>
                    <NavLink className="menu__responsive__item" to="/product-list">
                        Sản phẩm 
                        <FontAwesomeIcon className="menu__responsive__item__icon" icon={faChevronRight} />
                        {/* <SubItemsMobile items={this.menu.sanpham} /> */}
                    </NavLink>
                    <NavLink className="menu__responsive__item" to="/product-list?gender=0">
                        Cho Nam
                        <FontAwesomeIcon className="menu__responsive__item__icon" icon={faChevronRight} />
                        {/* <SubItemsMobile items={this.menu.nam.listItems_1} />
                        <SubItemsMobile items={this.menu.nam.listItems_2} />
                        <SubItemsMobile items={this.menu.nam.listItems_3} /> */}
                    </NavLink>
                    <NavLink className="menu__responsive__item" to="/product-list?gender=1">
                        Cho Nữ
                        <FontAwesomeIcon className="menu__responsive__item__icon" icon={faChevronRight} />
                    </NavLink>
                    <NavLink className="menu__responsive__item" to="/promotion">
                        Sale Off
                    </NavLink>
                    <NavLink className="menu__responsive__item" to="/discoveryou">
                        DiscoverYOU
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default Menu;