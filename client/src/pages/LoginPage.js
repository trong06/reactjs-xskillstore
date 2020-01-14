import React from 'react';
import Axios from 'axios';
import { NavLink, Redirect } from 'react-router-dom';
import Seperate from '../components/element/Seperate';
import Input from '../components/element/Form/Input';
import ErrorText from '../components/element/Text/ErrorText';
import ButtonRounded from '../components/element/Button/ButtonRounded'
import LoadingGif from '../images/loading.gif'
import SetTimeForCookie from '../modules/SetTimeForCookie';
import LoadingStore from '../components/element/Loading/LoadingStore';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: "",
            password: "",
            error: {
                content: "",
                status: false
            },
            loading: false,
            status: false
        }

        this.ID_USER = window.localStorage.getItem("access_token") || "";

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
    }

    onChangeUsername(event) {
        this.setState({username: event.target.value})
    }
    
    onChangePassword(event) {
        this.setState({password: event.target.value})
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({loading: true}, () => {
            Axios({
                method: "POST",
                url: `${process.env.REACT_APP_API_ENDPOINT}/api/users/login`,
                data: {
                    username: this.state.username, //Submit username
                    password: this.state.password //Submit password
                }
            }).then(res => {
                const { data } = res;
                if(data.status === "error") {
                    this.setState({
                        error: {
                            status: true,
                            content: data.msgVi,
                        },
                        loading: false,
                    })
                }
                else {
                    this.setState({
                        error: {
                            status: false,
                            content: ""
                        },
                        loading: false,
                        status: true
                    });
                    //Take token to add on cookie
                    // document.cookie = `token=${data.token};expiry=${SetTimeForCookie(60)}`;
                    // localStorage.setItem("access_token", data.token);
                    window.localStorage.setItem("access_token", data.token);
                }
            }).catch(err => {
                window.alert(`ERROR: ${err}`);
                this.setState({loading: false})
            })
        })
    }

    render() {
        const { loading } = this.state;
        return (
            <div className="formPattern-one">
                { loading && <LoadingStore /> }
                { this.state.status && <Redirect to="/" />  }
                <div className="formPattern-one__box">
                    <div className="formPattern-one__box__image" />
                    <form onSubmit={this.onSubmit} className="formPattern-one__box__form">
                        <h1 className="formPattern-one__box__form__title"> WELCOME BACK ! </h1>
                        { this.state.error.status && <ErrorText> { this.state.error.content } </ErrorText> }
                        <Input width="85%" onChange={this.onChangeUsername} value={this.state.username} type="text" placeholder="Username" />
                        <Input width="85%" onChange={this.onChangePassword} value={this.state.password} type="password" placeholder="Password" />
                        <Input 
                        type="submit" 
                        value={this.state.loading ? `Loading...` : "Đăng nhập"} 
                        width="85%" disabled={this.state.loading ? true : false} 
                        orange 
                        btn/>
                        <Seperate style={{width: "85%", margin: "15px auto"}} />
                        <ButtonRounded path="/register" width="80%" dark link>Tạo tài khoản mới</ButtonRounded>
                    </form>
                </div>
            </div>
        )
    }
}

export default LoginPage;