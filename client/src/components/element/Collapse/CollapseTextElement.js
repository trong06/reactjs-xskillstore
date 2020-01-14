import React from 'react';

export default class CollapseTextElement extends React.Component {
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

    render() {
        const { children, inline, color, onFilters, filter } = this.props;
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
        className={`collapse-text__content__text ${this.state.changed ? "collapse-text--changed" : ""} ${this.state.changed && color !== null && inline ? "collapse-text--color" : ""}`}>
            {children}
            {
                !inline && this.state.changed && <img className="collapse-text__content__text__close" src={CloseImg} />    
            }
        </span>
        )
    }
}