import React from 'react'
import PropTypes from 'prop-types'
import CardInSideText from './CardInSideText';

class Portfolio extends React.Component {
    render() {
        const { title_portfolio, shows, } = this.props;
        return (
            <div className="portfolio">
                <h1 className="portfolio__title">{ title_portfolio }</h1>
                <div style={{display:"grid",gridTemplateColumns: `repeat(${shows},${1}fr)`}} className="portfolio__box">
                    {
                        this.props.children
                    }
                </div>
            </div>
        )
    }
}

Portfolio.propTypes = {
    title_portfolio: PropTypes.string,
    shows: PropTypes.number
}

Portfolio.defaultProps = {
    shows: 3
}

export default Portfolio;