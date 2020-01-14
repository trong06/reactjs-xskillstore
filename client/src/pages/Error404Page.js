import React from 'react';
import Button from '../components/element/Button/Button';

class Error404Page extends React.Component {
    render() {
        return (
            <div className="error404-page">
                <div className="error404-page__box">
                    <h1 className="error404-page__box__text">Error 404 Page</h1>
                    <h3 className="error404-page__box__alert">Trang này không tồn tại</h3>
                    <div className="error404-page__box__back">
                        <Button navlink>Quay lại trang chủ</Button>
                        <a className="button" target="_blank" navlink href="https://www.facebook.com/trong.duong.77398">Liên hệ quản lý</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Error404Page;