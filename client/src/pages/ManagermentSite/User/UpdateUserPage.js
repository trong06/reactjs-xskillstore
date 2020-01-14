import React from 'react';
import Axios from 'axios';
import MultiSelect from "@khanacademy/react-multi-select";
import Management from '../../../components/layout/Common/Management';
import Box from '../../../components/element/Box/Box';
import Input from '../../../components/element/Form/Input';
import Alert from '../../../components/element/Alert/Alert';
import InputGroup from '../../../components/element/Form/InputGroup';
import Group from '../../../components/element/Div/Group';
import ErrorText from '../../../components/element/Text/ErrorText';
import { Redirect } from 'react-router-dom';
import LoadingStore from '../../../components/element/Loading/LoadingStore';

class UpdateUserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            firstname: "",
            lastname: "",
            address: "",
            permission: "",
            number_phone: "",
            email: "",
            errors: {},
            updated: false,
            got: true,
            loading: false
        }
        this.configHeaders = { Authorization: `Bearer ${window.localStorage.getItem("access_token")}` };
        this.ID_USER = this.props.match.params.id;

        this.onUsernameStateChange = this.onUsernameStateChange.bind(this);
        this.onFirstnameStateChange = this.onFirstnameStateChange.bind(this);
        this.onLastnameStateChange = this.onLastnameStateChange.bind(this);
        this.onAddressStateChange = this.onAddressStateChange.bind(this);
        this.onEmailStateChange = this.onEmailStateChange.bind(this);
        this.onPermissionStateChange = this.onPermissionStateChange.bind(this);
        this.onNumberPhoneStateChange = this.onNumberPhoneStateChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onUsernameStateChange(event) {
        this.setState({
            username: event.target.value
        })
    }
    onFirstnameStateChange(event) {
        this.setState({
            firstname: event.target.value
        })
    }
    onLastnameStateChange(event) {
        this.setState({
            lastname: event.target.value
        })
    }
    onAddressStateChange(event) {
        this.setState({
            address: event.target.value
        })
    }
    onNumberPhoneStateChange(event) {
        this.setState({
            number_phone: event.target.value
        })
    }
    onPermissionStateChange(event) {
        this.setState({
            permission: event.target.value
        })
    }
    onEmailStateChange(event) {
        this.setState({
            email: event.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({loading: true}, () => {
            Axios({
                method: "PUT",
                url: `${process.env.REACT_APP_API_ENDPOINT}/api/users/${this.ID_USER}`,
                data: {
                    username: this.state.username,
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    address: this.state.address,
                    permission: this.state.permission,
                    number_phone: this.state.number_phone,
                    email: this.state.email
                },
                headers: this.configHeaders
            }).then(res => {
                const { data } = res;
                if(data.status === "error") {
                    this.setState({errors: data.errors, loading: false})
                }
                else {
                    window.alert(data.msgVi);
                    this.setState({updated: true, loading: false});
                }
            }).catch(err => {
                window.alert(err);
                this.setState({loading: false})
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
                if(data.status === "error" && data.code === 404) {
                    window.alert("Người dùng này không tồn tại");
                    this.setState({got: false, loading: false});
                }
                else {
                    const { user } = data;
                    this.setState({
                        username: user.username,
                        address: user.address,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        permission: user.permission,
                        number_phone: user.number_phone,
                        loading: false
                    })
                }
            }).catch(err => {
                window.alert(`Người dùng này không tồn tại. ${err}`);
                this.setState({got: false, loading: false})
            })
        })
    }

    render() {
        const { firstname, lastname, address, username, email, permission, number_phone, loading } = this.state;
        return (
            <Management>
                { loading && <LoadingStore /> }
                {
                    this.state.updated && <Redirect to="/management-site/user" />
                }
                {
                    !this.state.got && <Redirect to="/error404" />
                }
                <Box title="Thông tin cá nhân người dùng">
                <Alert danger><b>Cảnh báo</b>: Đây là thông tin người dùng, chỉnh sửa sẽ vi phạm quyền riêng tư của người dùng</Alert>
                    <form onSubmit={this.onSubmit} style={{marginTop: "15px"}} className="update-user-page">
                        <InputGroup multigroup>
                            <Group>
                                <label htmlFor="firstname"><small>Họ</small> { (this.state.errors && this.state.errors.firstname) && <ErrorText> {this.state.errors.firstname.msgVi} </ErrorText> } </label>
                                <Input onChange={this.onFirstnameStateChange} value={firstname} id="firstname" type="text" placeholder="Firstname" square/>
                            </Group>
                            <Group>
                                <label htmlFor="lastname"><small>Tên</small> { (this.state.errors && this.state.errors.lastname) && <ErrorText> {this.state.errors.lastname.msgVi} </ErrorText> } </label>
                                <Input onChange={this.onLastnameStateChange} value={lastname} id="lastname" type="text" placeholder="Lastname" square/>
                            </Group>
                            <Group>
                                <label htmlFor="email"><small>Email</small> { (this.state.errors && this.state.errors.email) && <ErrorText> {this.state.errors.email.msgVi} </ErrorText> } </label>
                                <Input onChange={this.onEmailStateChange} value={email} id="email" type="email" placeholder="Email" square/>
                            </Group>
                        </InputGroup>
                        <label htmlFor="username"><small>Tên tài khoản</small> { (this.state.errors && this.state.errors.username) && <ErrorText> {this.state.errors.username.msgVi} </ErrorText> } </label>
                        <Input onChange={this.onUsernameStateChange} value={username} id="username" type="text" placeholder="Tên tài khoản" square/>
                        <label htmlFor="address"><small>Địa chỉ</small> { (this.state.errors && this.state.errors.address) && <ErrorText> {this.state.errors.address.msgVi} </ErrorText> } </label>
                        <Input onChange={this.onAddressStateChange} value={address} id="address" type="text" placeholder="Địa chỉ" square/>
                        <label htmlFor="numberPhone"><small>Số điện thoại</small> { (this.state.errors && this.state.errors.number_phone) && <ErrorText> {this.state.errors.number_phone.msgVi} </ErrorText> } </label>
                        <Input onChange={this.onNumberPhoneStateChange} value={number_phone} id="numberPhone" type="text" placeholder="Số điện thoại" square/>
                        <label htmlFor="permission"><small>Quyền</small> { (this.state.errors && this.state.errors.permission) && <ErrorText> {this.state.errors.permission.msgVi} </ErrorText> } </label>
                        <Input onChange={this.onPermissionStateChange} value={permission} id="permission" type="text" placeholder="Phân cấp quyền" square />
                        <Input type="submit" value="Cập nhật thông tin" violet square/>
                    </form>
                </Box>
            </Management>
        )
    }
}

export default UpdateUserPage;