import React from 'react';
import RegisterPage from '../../RegisterPage';
import Management from '../../../components/layout/Common/Management';

class CreateUserPage extends React.Component {
    render() {
        return (
            <Management>
                <RegisterPage />
            </Management>
        )
    }
}

export default CreateUserPage;