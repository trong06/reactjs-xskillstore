import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import CloseImg from '../../../images/close.svg';

// export function CollapseTextElement(props) {
//     const [changed, setChanged] = useState(false);
//     const { children, inline, color, onFilters } = props;

//     const onChanged = () => {
//         setChanged(!changed);
//         onFilters();
//     }

//     return (
//         <span 
//         style={{
//                 display: inline ? "inline-block" : "inherit",
//                 width: inline ? "20px" : "inherit",
//                 height: inline ? "20px" : "inherit",
//                 margin: inline ? "auto" : "5px 0",
//                 backgroundColor: inline && color !== null ? color : "$light-grey-light"
//         }} 
//         onClick={onChanged}
//         className={`collapse-text__content__text ${changed ? "collapse-text--changed" : ""} ${changed && color !== null && inline ? "collapse-text--color" : ""}`}>
//             {children}
//             {
//                 !inline && changed && <img className="collapse-text__content__text__close" src={CloseImg} />    
//             }
//         </span>
//     )
// }

export class CollapseTextElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            changed: false
        }
        this.onChanged = this.onChanged.bind(this);
    }

    onChanged() {
        this.setState({
            changed: !this.state.changed
        });
        this.props.onFilters();
    }

    componentDidMount() {
        this.setState({
            changed: this.props.active
        })
    }

    render() {
        const { children, inline, color, onFilters, filter, active } = this.props;
        return (
            <span 
            style={{
                    display: inline ? "inline-block" : "inherit",
                    width: inline ? "20px" : "inherit",
                    height: inline ? "20px" : "inherit",
                    margin: inline ? "auto" : "5px 0",
                    backgroundColor: inline && color !== null ? color : "$light-grey-light"
            }} 
            onClick={this.onChanged}
            className={`collapse-text__content__text ${active ? "collapse-text--changed" : ""} ${active && color !== null && inline ? "collapse-text--color" : ""}`}>
            {children}
            {
                !inline && active && <img className="collapse-text__content__text__close" src={CloseImg} />    
            }
        </span>
        )
    }
}

export class CollapseText extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toggle: true
        }

        this.onHandlingToggle = this.onHandlingToggle.bind(this);
    }

    onHandlingToggle() {
        this.setState({
            toggle: !this.state.toggle
        })
    }

    render() {
        const { title, data, inline, children, id, onFilters, filter, special } = this.props;
        return (
            <div className="collapse-text">
                {
                    title !== null && <h3 onClick={this.onHandlingToggle} className="collapse-text__title"> 
                        { title }
                        {
                            <FontAwesomeIcon className="collapse-text__title__icon" icon={this.state.toggle ? faChevronUp : faChevronDown} />
                        }
                    </h3>
                }
                {
                    data.length > 0 ? <div className={`collapse-text__content ${this.state.toggle ? "collapse-text--active" : ""}`}>
                        {
                            data.map((item,i) => (
                                <CollapseTextElement 
                                onFilters={
                                    onFilters(
                                        filter.min_price, 
                                        filter.max_price, 
                                        filter.gender, 
                                        item.id, 
                                        filter.status)} 
                                filter={filter}
                                key={`${i}-collapse-text`} 
                                inline={inline ? inline : false} 
                                color={item.color ? item.color : null}> 
                                    {item.title} 
                                </CollapseTextElement>
                            ))
                        }
                    </div> : children ? <div id={id} className={`collapse-text__content ${this.state.toggle ? "collapse-text--active" : ""}`}>
                        {
                            children
                        }
                    </div> : ""
                }
            </div>
        )
    }
}

CollapseText.defaultProps = {
    title: null,
    inline: false,
    color: null,
    data: []
}

// export default CollapseText