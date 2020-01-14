import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Portfolio from './Portfolio'
import CardProduct from '../../components/element/CardProduct';
import Module from '../../modules/Module';

class PortfolioSlide extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: 0,
            countItems: []
        }

        this.URL_PRODUCTS = `/product/`;

        this.onHandlingSlide = this.onHandlingSlide.bind(this);
        this.onCountDisplayE = this.onCountDisplayE.bind(this);
    }

    onHandlingSlide(spec) {
        return () => {
            if(spec === "next") {
                if(this.state.item + this.props.shows - 1 < this.props.products.length - 1) {
                    this.setState({
                        item: this.state.item + 1
                    })
                }
            }
            else {
                if(this.state.item - 1 >= 0) {
                    this.setState({
                        item: this.state.item - 1
                    })
                }
            }
        }
    }

    onCountDisplayE(countItems, amout) {
        for(let i = 0; i < amout; i++) {
            countItems.push(i);
        }
    }

    render() {
        const { title, shows, products } = this.props;
        let countItems = []
        this.onCountDisplayE(countItems, shows)
        
        return (
            <div className="portfolioSlide">
                <Portfolio shows={shows} title_portfolio={title} >
                    {
                        countItems.map((item,i) => (
                            products[this.state.item + i] && <CardProduct
                            key={`${i}-cartproduct`} 
                            url={`${this.URL_PRODUCTS}${products[this.state.item + i].url}`}
                            images={products[this.state.item + i].thumbnails}
                            title={`${products[this.state.item + i].title.slice(0,26)}...`}
                            price={Module.AddCommaToNumber(products[this.state.item + i].price)}
                            dropPrice={Module.AddCommaToNumber(products[this.state.item + i].dropPrice)} />
                        ))
                    }
                </Portfolio>
                <div className="portfolioSlide__control">
                    <FontAwesomeIcon onClick={this.onHandlingSlide("prev")} className="portfolioSlide__control__prev" icon={faChevronLeft} />
                    <FontAwesomeIcon onClick={this.onHandlingSlide("next")} className="portfolioSlide__control__next" icon={faChevronRight} />
                </div>
            </div>
        )
    }
}

PortfolioSlide.defaultProps = {
    shows: 4
}

export default PortfolioSlide;