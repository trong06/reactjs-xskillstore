import React from 'react';
import Management from '../../../components/layout/Common/Management';
import Box from '../../../components/element/Box/Box';
import Input from '../../../components/element/Form/Input';
import Module from '../../../modules/Module';
import Table from '../../../components/element/Table/Table';
import Axios from 'axios';
import Button from '../../../components/element/Button/Button';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ErrorText from '../../../components/element/Text/ErrorText';
import { Redirect } from 'react-router-dom';
import LoadingStore from '../../../components/element/Loading/LoadingStore';

class CreateTagPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            url: "",
            description: "",
            errors: {},
            created: false,
            loading: false
        }

        this.configHeaders = {
            Authorization: `Bearer ${window.localStorage.getItem("access_token")}`
        }

        this.onTitleStateChange = this.onTitleStateChange.bind(this);
        this.onUrlStateChange = this.onUrlStateChange.bind(this);
        this.onDescriptionStateChange = this.onDescriptionStateChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onTitleStateChange(event) {
        this.setState({
            name: event.target.value,
            url: Module.ConvertURL(event.target.value)
        })
    }
    onUrlStateChange(event) {
        this.setState({
            url: Module.ConvertURL(event.target.value)
        })
    }
    onDescriptionStateChange(event) {
        this.setState({
            description: event.target.value
        })
    }

    onSubmit(event) {
        event.preventDefault();
        this.setState({loading: true}, () => {
            Axios({
                method: "POST",
                url: `${process.env.REACT_APP_API_ENDPOINT}/api/tags`,
                data: {
                    name: this.state.name,
                    url: this.state.url,
                    description: this.state.description
                },
                headers: this.configHeaders
            }).then(res => {
                const { data } = res;
                if(data.status === "error") {
                    this.setState({
                        errors: data.errors,
                        loading: false
                    });
                }
                else {
                    window.alert("Tạo thành công");
                    this.setState({
                        created: true,
                        loading: false
                    });
                }
            }).catch(err => {
                window.alert(err);
                this.setState({loading: false});
            })
        })
    }

    render() {
        const { loading } = this.state;
        return (
            <Management>
                { loading && <LoadingStore /> }
                {
                    this.state.created && <Redirect to={`/management-site/tag/edit/${this.state.url}`} />
                }
                <div className="manage-tag-page">
                    <form onSubmit={this.onSubmit} className="manage-tag-page__header">
                        <div>
                            <Box title="Quick create">
                                <Input onChange={this.onTitleStateChange} value={this.state.name} type="text" placeholder="Tên tiêu đề thể loại" square />
                                <ErrorText> {(this.state.errors && this.state.errors.name) && this.state.errors.name.msgVi} </ErrorText>
                                <Input onChange={this.onUrlStateChange} value={this.state.url} type="text" placeholder="Đường dẫn thể loại" square />
                                <ErrorText> {(this.state.errors && this.state.errors.url) && this.state.errors.url.msgVi} </ErrorText>
                                <Input onChange={this.onDescriptionStateChange} value={this.state.description} type="text" placeholder="Miêu tả thể loại" square />
                                <Input type="submit" value="Tạo Thể loại" violet style={{cursor: "pointer"}} square />
                            </Box>
                        </div>
                        <div>
                            <Box title="Bản xem trước">
                                <p><b style={{color: "#4e73df"}}>Tiêu đề: </b> {this.state.name} </p>
                                <p><b style={{color: "#4e73df"}}>Đường dẫn: </b> {this.state.url} </p>
                                <p><b style={{color: "#4e73df"}}>Miêu tả: </b> {this.state.description} </p>
                            </Box>
                        </div>
                    </form>
                </div>
            </Management>
        )
    }
}

export default CreateTagPage;