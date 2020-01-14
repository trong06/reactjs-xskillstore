import React from 'react';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import Management from '../../../components/layout/Common/Management';
import Box from '../../../components/element/Box/Box';
import Input from '../../../components/element/Form/Input';
import InputGroup from '../../../components/element/Form/InputGroup';
import Group from '../../../components/element/Div/Group';
import ErrorText from '../../../components/element/Text/ErrorText';
import LoadingStore from '../../../components/element/Loading/LoadingStore';

class CreatePromotionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            percent: 0,
            expiry_date: "",
            status: false,
            errors: {},
            created: false,
            loading: false
        }

        this.configHeaders = { Authorization: `Bearer ${window.localStorage.getItem("access_token")}` }

        this.onNameStateChange = this.onNameStateChange.bind(this);
        this.onPercentStateChange = this.onPercentStateChange.bind(this);
        this.onDateStateChange = this.onDateStateChange.bind(this);
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

    onSubmit(event) {
        event.preventDefault();
        this.setState({loading: true}, () => {
            Axios({
                method: "POST",
                url: `${process.env.REACT_APP_API_ENDPOINT}/api/promotion`,
                data: {
                    name: this.state.name,
                    percent: Number(this.state.percent),
                    expiry_date: this.state.expiry_date,
                    status: true
                },
                headers: this.configHeaders
            }).then(res => {
                const { data } = res;
                if(data.status === "error") {
                    this.setState({errors: data.errors, loading: false});
                }
                else {
                    this.setState({created: true, loading: false});
                }
            }).catch(err => {
                window.alert(err);
                this.setState({loading: false});
            })
        })
    }

    render() {
        const { errors, loading } = this.state;
        return (
            <Management>
                { loading && <LoadingStore /> }
                { this.state.created && <Redirect to="/management-site/promotion" /> }
                <form onSubmit={this.onSubmit}>
                    <Box title="Tạo mã khuyến mãi mới">
                        <InputGroup multigroup>
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
                        </InputGroup>
                        <Input type="submit" value="Khởi tạo mã khuyến mãi" violet square/>
                    </Box>
                </form>
            </Management>
        )
    }
}

export default CreatePromotionPage;