import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import Management from '../../../components/layout/Common/Management';
import Box from '../../../components/element/Box/Box';
import Input from '../../../components/element/Form/Input';
import InputGroup from '../../../components/element/Form/InputGroup';
import Group from '../../../components/element/Div/Group';
import ErrorText from '../../../components/element/Text/ErrorText';
import LoadingStore from '../../../components/element/Loading/LoadingStore';

class UpdatePromotionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            percent: 0,
            expiry_date: "",
            status: false,
            errors: {},
            updated: false,
            got: true,
            loading: false
        }
        this.ID_PROMOTION = this.props.match.params.id;
        this.configHeaders = { Authorization: `Bearer ${window.localStorage.getItem("access_token")}` }

        this.onNameStateChange = this.onNameStateChange.bind(this);
        this.onPercentStateChange = this.onPercentStateChange.bind(this);
        this.onDateStateChange = this.onDateStateChange.bind(this);
        this.onStatusStateChange = this.onStatusStateChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onNameStateChange(event) {
        this.setState({name: (event.target.value).toUpperCase().replace(" ", "")});
    }
    
    onPercentStateChange(event) {
        this.setState({percent: event.target.value});
    }
    
    onDateStateChange(event) {
        this.setState({expiry_date: event.target.value});
    }
    onStatusStateChange() {
        this.setState({status: !this.state.status})
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({loading: true}, () => {
            Axios({
                method: "PUT",
                url: `${process.env.REACT_APP_API_ENDPOINT}/api/promotion/${this.ID_PROMOTION}`,
                data: {
                    name: this.state.name,
                    percent: Number(this.state.percent),
                    expiry_date: this.state.expiry_date,
                    status: this.state.status
                },
                headers: this.configHeaders
            }).then(res => {
                const { data } = res;
                if(data.status === "error") {
                    this.setState({errors: data.errors, loading: false});
                }
                else {
                    window.alert("Cập nhật thành công");
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
                url: `${process.env.REACT_APP_API_ENDPOINT}/api/promotion/${this.ID_PROMOTION}`
            }).then(res => {
                const { data } = res;
                if(data.status === "error") {
                    window.alert(data.msgVi || "Không tìm thấy mã khuyến mãi này");
                    this.setState({got: false, loading: false})
                }
                else {
                    const { promotion } = data;
                    let expiry_date = promotion.expiry_date.split("T")[0];
                    this.setState({
                        name: promotion.name,
                        percent: promotion.percent,
                        expiry_date: expiry_date,
                        status: promotion.status,
                        loading: false
                    })
                }
            }).catch(err => {
                this.setState({
                    got: false,
                    loading: false
                })
            })
        })
    }

    render() {
        const { errors, loading } = this.state;
        return (
            <Management>
                { loading && <LoadingStore /> }
                { this.state.updated && <Redirect to="/management-site/promotion" /> }
                { !this.state.got && <Redirect to="/error404" /> }
                <form className="update-promotion-page" onSubmit={this.onSubmit}>
                    <Box title="Cập nhật mã khuyến mãi">
                        <InputGroup group>
                            <Group>
                                <label htmlFor="namepromotion"><small>Mã khuyến mãi</small> { (errors && errors.name) && <ErrorText> {errors.name.msgVi} </ErrorText> } </label>
                                <Input onChange={this.onNameStateChange} value={this.state.name} id="namepromotion" type="text" placeholder="Mã khuyến mãi (IN HOA)" square/>
                            </Group>
                            <Group>
                                <label htmlFor="percent"><small>Phần trăm</small> { (errors && errors.percent) && <ErrorText> {errors.percent.msgVi} </ErrorText> } </label>
                                <Input onChange={this.onPercentStateChange} value={this.state.percent} id="percent" type="number" placeholder="Phần trăm khuyến mãi" min="0" max="100" square/>
                            </Group>
                            <Group>
                                <label htmlFor="expiry-date"><small>Ngày hết hạn</small> { (errors && errors.expiry_date) && <ErrorText> {errors.expiry_date.msgVi} </ErrorText> } </label>
                                <Input onChange={this.onDateStateChange} value={this.state.expiry_date} id="expiry-date" type="date" square/>
                            </Group>
                            <Group>
                            <label htmlFor="expiry-date"><small>Trạng thái</small> { (errors && errors.status) && <ErrorText> {errors.status.msgVi} </ErrorText> } </label>
                                <div onClick={this.onStatusStateChange}>
                                    {
                                        this.state.status ? 
                                        <FontAwesomeIcon className="update-promotion-page__icon" icon={faToggleOn}/>
                                        :
                                        <FontAwesomeIcon className="update-promotion-page__icon" icon={faToggleOff}/>
                                    }
                                </div>
                            </Group>
                        </InputGroup>
                        <Input type="submit" value="Cập nhật mã khuyến mãi" violet square/>
                    </Box>
                </form>
            </Management>
        )
    }
}

export default UpdatePromotionPage;