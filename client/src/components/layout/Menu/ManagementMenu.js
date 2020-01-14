import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import Search from '../../element/Form/Search';
import ThumbnailIMG from '../../../images/thumbnail.png';

class ManagementMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggle: false
        }
        this.onToggle = this.onToggle.bind(this);
        this.onLogout = this.onLogout.bind(this);
    }

    onToggle() {
        this.setState({isToggle: !this.state.isToggle});
    }

    onLogout() {
        window.localStorage.removeItem("access_token")
        window.location.reload();
    }

    render() {
        return (
            <div className="management-menu">
                <form className="management-search">
                    <Search type="text" placeholder="Search for . . ." />
                </form>
                <div className="management-menu__user" onClick={this.onToggle}>
                    <span className="management-menu__user__text">Quản lý</span>
                    <img className="management-menu__user__img" src={ThumbnailIMG} />
                    <div className={`management-menu__user__settings ${this.state.isToggle ? "management-menu--active" : ""}`}>
                        <button onClick={this.onLogout} className="management-menu__user__settings__choose">
                            <FontAwesomeIcon className="management-menu__user__settings__choose__icon" icon={faSignOutAlt} />
                            <span className="management-menu__user__settings__choose__text">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ManagementMenu;