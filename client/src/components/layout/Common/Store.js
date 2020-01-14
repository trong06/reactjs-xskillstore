import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import SocialSide from '../../element/SocialSide';
import CartSide from '../../element/CartSide';

class Store extends React.Component {
    render() {
        const { children } = this.props;
        return (
            <React.Fragment>
                <Header />
                { children }
                <Footer />
                <SocialSide
                social={{
                fb: "https://www.facebook.com/trong.duong.77398" , 
                yb: "https://www.youtube.com/channel/UC30b_LTavof_5LAjvGQQt_A", 
                ins: "https://www.instagram.com/duong_ductrong/" }}
                />
                <CartSide />
            </React.Fragment>
        )
    }
}

export default Store;