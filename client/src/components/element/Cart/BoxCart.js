import React from 'react';
import Seperate from '../Seperate';
import Button from '../Button/Button';

class BoxCart extends React.Component {
    render() {
        const { title, children } = this.props;
        return (
            <div className="box-cart">
                <h1 className="box-cart__title"> { title } </h1>
                <div>
                    { children }
                </div>
                <Seperate />
            </div>
        )
    }
}

export default BoxCart;