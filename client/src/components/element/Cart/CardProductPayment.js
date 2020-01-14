import React from 'react';
import Input from '../Form/Input';
import InputGroup from '../Form/InputGroup';
import Group from '../Div/Group';
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faLink, faAmbulance } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

class CardProductPayment extends React.Component {
    render() {
        const {
            id,
            image, 
            title, 
            price, 
            size, 
            amount, 
            total_money, 
            status, 
            url,
            onDeleteOneCart
        } = this.props;
        return (
            <div className="card-product-payment">
                <div className="card-product-payment__image">
                    <img className="card-product-payment__image__child" src={image} />
                </div>
                <div className="card-product-payment__detail">
                    <h1 className="card-product-payment__detail__title">
                        <NavLink className="card-product-payment__detail__title__child" to={url}>{title}</NavLink>
                    </h1>
                    <p className="card-product-payment__detail__price"><b>Giá:</b> {price} VND</p>
                    <div className="card-product-payment__detail__quantity">
                        <InputGroup group>
                            <Group>
                                <label><small>Số lượng</small></label>
                                <Input type="number" min="1" max="15" value={amount} square/>
                            </Group>
                            <Group>
                                <label><small>Size</small></label>
                                <Input type="number" min="32" max="43" value={size} square/>
                            </Group>
                        </InputGroup>
                    </div>
                </div>
                <div className="card-product-payment__total">
                    <h2 className="card-product-payment__total__money"> { total_money } VND </h2>
                    <p className="card-product-payment__total__status"> { status ? "Còn hàng" : "Hết hàng" } </p>
                    <Button type="button" onClick={onDeleteOneCart(id)} style={{float: "right"}}> <FontAwesomeIcon icon={faTrash} /> </Button>
                    {/* <Button> <FontAwesomeIcon icon={faAmbulance} /> </Button> */}
                </div>
            </div>
        )
    }
}

CardProductPayment.defaultProps = {
    title: "Something title",
    url: "/",
    price: "XXX.XXX"
}

export default CardProductPayment;