import React from 'react';
import Axios from 'axios';
import Management from '../../../components/layout/Common/Management';
import Box from '../../../components/element/Box/Box';
import Input from '../../../components/element/Form/Input';
import { Redirect } from 'react-router-dom';
import Alert from '../../../components/element/Alert/Alert';
import LoadingStore from '../../../components/element/Loading/LoadingStore';

class ResetPassUserPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            password: "",
            error: "",
            got: true,
            updated: false,
            loading: false
        }

        this.ID_USER = this.props.match.params.id;
        this.configHeaders = {
            Authorization: `Bearer ${window.localStorage.getItem("access_token")}`
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onPasswordStateChange = this.onPasswordStateChange.bind(this);
    }

    onPasswordStateChange(event) {
        this.setState({password: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({loading: true}, () => {
            Axios({
                method: "PATCH",
                url: `${process.env.REACT_APP_API_ENDPOINT}/api/users/${this.ID_USER}`,
                data: {
                    password: this.state.password
                },
                headers: this.configHeaders
            }).then(res => {
                const { data } = res;
                if(data.status === "error") {
                    if(data.status === "error" && Number(data.code) !== 404) {
                        this.setState({
                            error: data.msgVi,
                            loading: false
                        })
                    }
                    else {
                        this.setState({
                            got: false,
                            loading: false
                        });
                        return;
                    }
                }
                else {
                    window.alert("Cập nhật khẩu mới thành công");
                    this.setState({
                        updated: true,
                        loading: false
                    })
                }
                
            }).catch(err => {
                window.alert(err);
                this.setState({loading: false, got: false})
            })
        })
    }

    componentDidMount() {
        this.setState({loading: true}, () => {
            Axios({
                method: "GET",
                url: `${process.env.REACT_APP_API_ENDPOINT}/api/users/${this.ID_USER}`
            }).then(res => {
                const { data } = res;
                if(data.status === "error") {
                    window.alert(data.msgVi || "Không tìm thấy người dùng ID này");
                    this.setState({
                        got: false,
                        loading: false
                    })
                }
                else {
                    this.setState({
                        loading: false
                    })
                }
            }).catch(err => {
                window.alert(err);
                this.setState({loading: false, got: false})
            })
        })
    }

    render() {
        const { loading } = this.state;
        return (
            <Management>
                { loading && <LoadingStore /> }
                {
                    !this.state.got && <Redirect to="/error404" />
                }
                {
                    this.state.updated && <Redirect to="/management-site/user" />
                }
                <form onSubmit={this.onSubmit}>
                    <Box title="New Password">
                        { this.state.error && <Alert danger> {this.state.error} </Alert> }
                        <Input onChange={this.onPasswordStateChange} value={this.state.password} type="password" placeholder={"Mật khẩu mới"} square/>
                        <Input type="submit" value="Gửi" violet square/>
                    </Box>
                </form>
            </Management>
        )
    }
}

export default ResetPassUserPage;