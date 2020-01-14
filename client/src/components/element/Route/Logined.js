import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Axios from 'axios';

class Logined extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            authorization: null
        }
        this.config = {
            // Authorization: `Bearer ${document.cookie.split("=")[1]}`
            Authorization: `Bearer ${window.localStorage.getItem("access_token")}`
        }
    }

    componentDidMount() {
        this.setState({loading: true}, () => {
            Axios({
                method: "GET",
                url: `${process.env.REACT_APP_API_ENDPOINT}/api/logined`,
                headers: this.config
            }).then(res => {
                const { data } = res;
                if(data.status === "error") {
                    this.setState({ authorization: false })
                }
                else {
                    this.setState({ authorization: true, loading: false })
                }
            }).catch(err => {
                window.alert(err);
            })
        })
    }

    render() {
        const { children, component, path } = this.props;
        const { authorization, loading } = this.state;
        return (
            <React.Fragment>
                { 
                    !authorization && authorization !== null ? //Conditions
                    <Redirect to="/login" /> : //False
                    <Route path={path} component={component || children} /> //true
                }
            </React.Fragment>
        )
    }
}

export default Logined;