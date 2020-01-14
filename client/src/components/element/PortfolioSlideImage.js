import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Portfolio from './Portfolio'
import CardProduct from '../../components/element/CardProduct';
import ThumbnailLogo from '../../images/thumbnail.jpg'

class PortfolioSlideImage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            item: 0,
            countItems: [],
            image: ThumbnailLogo
        }

        this.onHandlingSlide = this.onHandlingSlide.bind(this);
        this.onCountDisplayE = this.onCountDisplayE.bind(this);
        this.onChangedImage = this.onChangedImage.bind(this);
    }

    onHandlingSlide(spec) {
        return () => {
            if(spec === "next") {
                //Nếu item + amount shows < độ dài images thì tiếp tục tăng 1
                if(this.state.item + this.props.shows - 1 < this.props.images.length - 1) {
                    this.setState({
                        item: this.state.item + 1
                    })
                }
            }
            else {
                //Nếu item + amount shows < độ dài images thì tiếp tục tăng 1
                if(this.state.item - 1 >= 0) {
                    this.setState({
                        item: this.state.item - 1
                    })
                }
            }
        }
    }

    onChangedImage(event) {
        this.setState({
            image: event.target.src
        })
    }

    onCountDisplayE(countItems, amout) {
        for(let i = 0; i < amout; i++) {
            countItems.push(i);
        }
    }

    render() {
        const { title, shows, images } = this.props;
        let countItems = []
        this.onCountDisplayE(countItems, shows)
        return (
            <>
            {/* <img className="portfolioSlide__images" src={Array.isArray(images) ? images[this.state.item] : images[this.state.item]} /> */}
            <img className="portfolioSlide__images" src={this.state.image} />
            <div className="portfolioSlide">
                <Portfolio shows={shows} title_portfolio={""} >
                    {
                        countItems.map((item,i) => (
                            (images && images[this.state.item + i]) && <CardProduct 
                            key={`${i}-cartproduct`}
                            url={"#"}
                            images={images[this.state.item + i]}
                            title={""}
                            price={null}
                            dropPrice={null}
                            name_color={null}
                            heightImage={"150px"}
                            onClick={this.onChangedImage}
                            />
                        ))
                    }
                </Portfolio>
                <div className="portfolioSlide__control">
                    <FontAwesomeIcon onClick={this.onHandlingSlide("prev")} className="portfolioSlide__control__prev" icon={faChevronLeft} />
                    <FontAwesomeIcon onClick={this.onHandlingSlide("next")} className="portfolioSlide__control__next" icon={faChevronRight} />
                </div>
            </div>
            </>
        )
    }
}

PortfolioSlideImage.defaultProps = {
    shows: 4
}

export default PortfolioSlideImage;