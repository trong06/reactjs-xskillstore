import React from 'react'
import { NavLink } from 'react-router-dom'
import fbIcon from '../../images/icon_facebook.svg'
import ybIcon from '../../images/icon_social3.png'
import insIcon from '../../images/icon_social2.png'

class SocialSide extends React.Component {
    render() {
        const { social, top, left, right, bottom } = this.props;
        return (
            <div style={{top: `${top}`, left: `${left}`, right: `${right}`, bottom: `${bottom}`}} className="social-side">
                <a target="_blank" href={social.fb}>
                    <img className="social-side__icon" src={fbIcon} />
                </a>
                <a target="_blank" href={social.yb}>
                    <img className="social-side__icon" src={ybIcon} />
                </a>
                <a target="_blank" href={social.ins}>
                    <img className="social-side__icon" src={insIcon} />
                </a>
            </div>
        )
    }
}

SocialSide.defaultProps = {
    top: "45%",
    left: "auto",
    bottom: "auto",
    right: "0px"
}

export default SocialSide;