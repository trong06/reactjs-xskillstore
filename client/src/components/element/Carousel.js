import React from 'react'
import {NavLink} from 'react-router-dom'

function CarouselControl(props) {
    const { onHandlingCarousel, carouselList } = props;
    return (
        <div className="carousel__control">
            {
                carouselList.map((item, index) => (
                    <div key={`${index}-carousel-control`} onClick={onHandlingCarousel(index)} className="carousel__control__btn" />
                ))
            }
        </div>
    )
}

function CarouselImage(props) {
    const { url, image, active, index } = props;
    return (
        <NavLink to={url}>
            <img className={`carousel__image ${active === index && "carousel--active"}`} src={image} />
        </NavLink>
    )
}

function CarouselText(props) {
    const { title, para, active, index } = props;
    return (
        <div className={`carousel__text ${active === index && "carousel--active"}`}>
            <h3 className="carousel__text__title">{title}</h3>
            <p className="carousel__text__para"> { para } </p>
        </div>
    )
}

class Carousel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: 0
        }

        this.loopCarousel = null;

        this.onHandlingCarousel = this.onHandlingCarousel.bind(this);
    }

    onHandlingCarousel(index) {
        return () => {
            this.setState({
                active: index
            })
        }
    }

    autoCarousel() {
        let ms = 8000;
        this.loopCarousel = setInterval(() => {
            this.setState({
                active: this.state.active + 1 >= this.props.content.length ? 0 : this.state.active + 1
            })
        },ms)
    }

    componentDidMount() {
        this.props.auto && this.autoCarousel();
    }

    componentWillUnmount() {
        clearInterval(this.loopCarousel);
    }

    render() {
        const { content, style, detail } = this.props;
        return (
            <React.Fragment>
                <div style={style} className="carousel">
                    {
                        content.map((item, index) => (
                            <CarouselImage key={`${index}carousel`} url={`/article/${item.url}`} image={item.image || item.thumbnail} index={index} active={this.state.active} />
                        ))
                    }
                    <CarouselControl carouselList={content} onHandlingCarousel={this.onHandlingCarousel} />
                </div>
                {
                    (detail && content ) && content.map((item, index) => (
                        <CarouselText key={`${index}-carousel`} title={item.title} para={item.paragraph} active={this.state.active} index={index} />
                    ))
                }
            </React.Fragment>
        )
    }
}

Carousel.defaultProps = {
    auto: true
}

export default Carousel;