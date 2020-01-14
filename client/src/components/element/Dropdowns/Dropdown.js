import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight,faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isToggle: false
        }

        this.onDropdown = this.onDropdown.bind(this);
    }

    onDropdown() {
        this.setState({ isToggle: !this.state.isToggle })
    }

    render() {
        const { icon, titleDropdown, titleContent, dropdowns } = this.props;
        return (
            <div className="dropdown">
                <button className={`dropdown__btn ${ this.state.isToggle ? "dropdown--clicked" : "" }`} onClick={this.onDropdown}>
                    <FontAwesomeIcon className="dropdown__btn__icon" icon={icon} />
                    <span className="dropdown__btn__title">{ titleDropdown }</span>
                    <FontAwesomeIcon className="dropdown__btn__icon" icon={this.state.isToggle ? faAngleDown : faAngleRight} />
                </button>
                <div className={`dropdown__content ${ this.state.isToggle ? "dropdown--active" : "" }`}>
                    <small className="dropdown__content__title"> { titleContent } </small>
                    {
                        dropdowns.map((content, index) => (
                            <NavLink key={`${index}-dropdown`} className="dropdown__content__text" to={content.url}>
                                { content.name }
                            </NavLink>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default Dropdown;