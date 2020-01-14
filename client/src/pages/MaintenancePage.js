import React from 'react';
import MaintenanceIMG2 from '../images/maintenance-2.png'
import Button from '../components/element/Button/Button';

class MaintenancePage extends React.Component {
    render() {
        return (
            <div className="maintenance-page">
                <div className="maintenance-page__box">
                    <h1 className="maintenance-page__box__text">ĐANG CẬP NHẬT</h1>
                    <img className="maintenance-page__box__image" src={MaintenanceIMG2} />
                    <h3 className="maintenance-page__box__alert">VUI LÒNG QUAY LẠI TRANG CHỦ</h3>
                    <div className="maintenance-page__box__back">
                        <Button navlink>Quay lại trang chủ</Button>
                        <a className="button" target="_blank" navlink href="https://www.facebook.com/trong.duong.77398">Liên hệ quản lý</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default MaintenancePage;