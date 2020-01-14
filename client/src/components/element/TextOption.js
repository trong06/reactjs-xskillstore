import React, {useState} from 'react'

function TextOption(props) {
    const [changed, setChanged] = useState(props.changed);
    const { children, style, callback, actived, onClick } = props;

    const onChanged = () => {
        setChanged(!changed);
        callback();
    }
    return (
        <div onClick={onClick} className={`text-option${actived === true ? " text-option--changed" : ""}`}>
            {
                children
            }
        </div>
    )
}

TextOption.defaultProps = {
    changed: false
}

export default TextOption;