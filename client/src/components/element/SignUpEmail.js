import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

class SignUpEmail extends React.Component {
    render() {
        return (
            <form className="signup-email">
                <input className="signup-email__textbox" type="email" placeholder="Email" />
                <input className="signup-email__btn" type="submit" value="Đăng ký" />
            </form>
        )
    }
}

export default SignUpEmail;