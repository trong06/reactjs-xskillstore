import React from 'react';
import Axios from 'axios';
import { NavLink, Redirect } from 'react-router-dom';
import Input from '../components/element/Form/Input';
import ErrorText from '../components/element/Text/ErrorText';
import SuccessText from '../components/element/Text/SuccessText';
import LoadingStore from '../components/element/Loading/LoadingStore';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            firstname: "",
            lastname: "",
            address: "",
            numberPhone: "",
            email: "",
            errors: {
                username: false,
                password: false,
                firstname: false,
                lastname: false,
                address: false,
                numberPhone: false,
                email: false
            },
            status: false, //Status register
            loading: false
        }
        this.onRegister = this.onRegister.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeNumberPhone = this.onChangeNumberPhone.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
    }

    onChangeUsername(event) { this.setState({username: event.target.value}) }
    onChangePassword(event) { this.setState({password: event.target.value}) }
    onChangeFirstName(event) { this.setState({firstname: event.target.value}) }
    onChangeLastName(event) { this.setState({lastname: event.target.value}) }
    onChangeAddress(event) { this.setState({address: event.target.value}) }
    onChangeNumberPhone(event) { this.setState({numberPhone: event.target.value}) }
    onChangeEmail(event) { this.setState({email: event.target.value}) }

    onRegister(event) {
        event.preventDefault();
        this.setState({loading: true}, () => {
            Axios({
                method: "POST",
                url: `${process.env.REACT_APP_API_ENDPOINT}/api/users`,
                data: {
                    username: this.state.username,
                    password: this.state.password,
                    address: this.state.address,
                    number_phone: this.state.numberPhone,
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    email: this.state.email
                }
            }).then(res => {
                const { data } = res;
                if(data.status === "error") {
                    this.setState({
                        errors: data.errors,
                        loading: false
                    });
                }
                else {
                    this.setState({
                        errors: {
                            username: false,
                            password: false,
                            firstname: false,
                            lastname: false,
                            address: false,
                            numberPhone: false,
                            email: false
                        },
                        status: true,
                        loading: false
                    });
                }
            }).catch(err => {
                window.alert("ERROR REGISTER", err);
                this.setState({loading: false})
            })
        })
    }

    render() {
        const { 
            errors, 
            status, 
            firstname, 
            lastname, 
            username,
            password, 
            address, 
            numberPhone, 
            email,
            loading
        } = this.state
        return (
            <div className="formPattern-one register-page">
                {
                    // status && <Redirect to="/login" />
                }
                {
                    loading && <LoadingStore />
                }
                <div className="formPattern-one__box">
                    <div className="formPattern-one__box__image">
                        <ul>
                            { errors.username && <li><ErrorText> { errors.username.msgVi } </ErrorText></li> }
                            { errors.password && <li><ErrorText> { errors.password.msgVi } </ErrorText></li> }
                            { errors.firstname && <li><ErrorText> { errors.firstname.msgVi } </ErrorText></li> }
                            { errors.lastname && <li><ErrorText> { errors.lastname.msgVi } </ErrorText></li> }
                            { errors.address && <li><ErrorText> { errors.address.msgVi } </ErrorText></li> }
                            { errors.email && <li><ErrorText> { errors.email.msgVi } </ErrorText></li> }
                            { errors.numberPhone && <li><ErrorText> { errors.number_phone.msgVi } </ErrorText></li> }
                        </ul>
                    </div>
                    <form onSubmit={this.onRegister} className="formPattern-one__box__form">
                        <h1 className="formPattern-one__box__title">Register Account !</h1>
                        {
                            status && !Object.values(errors).find(err => err === true) ? 
                            <SuccessText>Đăng ký thành công, bấm <NavLink to="/login">Đăng nhập</NavLink> để tiếp tục mua hàng</SuccessText> :
                            ""
                        }
                        <div className="register-page__flname">
                            <Input onChange={this.onChangeFirstName} value={firstname} type="text" placeholder="Họ tên" width="40%" />
                            <Input onChange={this.onChangeLastName} value={lastname} type="text" placeholder="tên" width="40%" />
                        </div>
                        <Input onChange={this.onChangeUsername} value={username} type="text" placeholder="Username" width="90%" />
                        <Input onChange={this.onChangePassword} value={password} type="password" placeholder="Password" width="90%" />
                        <div className="register-page__flname">
                            <Input onChange={this.onChangeAddress} value={address} type="text" placeholder="Địa chỉ" width="40%" />
                            <Input onChange={this.onChangeNumberPhone} value={numberPhone} type="text" placeholder="Số điện thoại" width="40%" />
                        </div>
                        <Input onChange={this.onChangeEmail} value={email} type="email" placeholder="Email" width="90%" />
                        <Input type="submit" width="95%" value="Đăng ký thành viên" dark btn/>
                    </form>
                </div>
            </div>
        )
    }
}

export default RegisterPage;