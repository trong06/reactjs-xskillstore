import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBoxOpen, faMapMarked, faHeart, faUser } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import CartShop from '../../images/icon_gio_hang.svg'
import Context from '../../contexts/Context'

function NavTopBar(props) {
    const [show, setShow] = useState(true);
    const { path, icon, name, image} = props;


    const handlingResponsive = () => {
        let width = document.documentElement.clientWidth;
        let axisY = window.pageYOffset;
        if(width <= 425 && axisY >= 0) {
            setShow(false)
        }
        else {
            setShow(true)
        }
    }

    window.addEventListener("resize", () => {
        handlingResponsive();
    })

    window.addEventListener("load", () => {
        handlingResponsive();
    });

    useEffect(() => {
        window.removeEventListener("resize", () => {
            handlingResponsive();
        })
        window.removeEventListener("load", () => {
            handlingResponsive();
        })
    })
    
    return (
        <NavLink className={`topbar__link ${image ? "topbar__link--cart" : null}`} to={ path }>
            {
                icon && !image ? <FontAwesomeIcon className="topbar__link__icon" icon={ icon } /> :  <img className="topbar__link__icon" src={ image } />
            }
            {
                show === false ? "" : name
            }
        </NavLink>
    )
}

class TopBar extends React.Component {
    render() {
        return (
            <Context.Consumer>
                {({stateCartAmount}) => (
                    <div className="topbar">
                        <NavTopBar path="/find-orders" icon={faBoxOpen} name="Tra cứu đơn hàng" />
                        <NavTopBar path="/management-site" icon={faMapMarked} name="Tìm cửa hàng" />
                        <NavTopBar path="#" icon={faHeart} name="Yêu thích" />
                        <NavTopBar path="/login" icon={faUser} name="Đăng nhập" />
                        <NavTopBar path="/payment" image={CartShop} name={`Giỏ hàng (${stateCartAmount})`} />
                    </div>
                )}
            </Context.Consumer>
        )
    }
}

export default TopBar;