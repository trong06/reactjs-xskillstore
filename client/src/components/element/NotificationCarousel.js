import React from 'react';
import PropTypes from 'prop-types'; // ES6
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

class NotificationCarousel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: 0
        }

        this.onHandlingCarousel = this.onHandlingCarousel.bind(this);
    }

    onHandlingCarousel(spec) {
        return () => {
            let contentLength = this.props.content.length;
            if(spec === "next") {
                this.setState({
                    active: this.state.active + 1 >= contentLength ? 0 : this.state.active + 1
                })
            }
            else {
                this.setState({
                    active: this.state.active - 1 < 1 ? contentLength - 1 : this.state.active - 1
                })
            }
        }
    }

    render() {
        const { content } = this.props;
        return (
            <div className="notification-carousel">
                <div className="notification-carousel__content">
                    
                    {
                        content.map((item, index) => (
                            <NavLink 
                            key={`${index}carousel-notice`}
                            to={item.url}
                            className={`notification-carousel__content__text ${this.state.active === index && "notification-carousel--active" }`}>
                                { item.content }
                            </NavLink>
                        ))
                    }
                    
                    <span 
                    onClick={this.onHandlingCarousel("prev")}  
                    className="notification-carousel__content__prev">
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </span>
                    <span 
                    onClick={this.onHandlingCarousel("next")}  
                    className="notification-carousel__content__next">
                        <FontAwesomeIcon icon={faChevronRight} />
                    </span>
                </div>
            </div>
        )
    }
}

NotificationCarousel.propTypes = {
    content: PropTypes.array
}

export default NotificationCarousel