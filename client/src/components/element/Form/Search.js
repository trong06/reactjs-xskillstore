import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class Search extends React.Component {
    render() {
        const { type, placeholder, value } = this.props;
        return (
            <div className="search">
                <input className="search__input" type={type} placeholder={placeholder} value={value} />
                <button className="search__btn" type="submit">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        )
    }
}

export default Search;