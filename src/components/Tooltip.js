import React from 'react';

const Tooltip = (props) => {

    return (
        <div className="tooltip">
            <p className="text">{props.text}</p>
        </div>
    )
}

export default Tooltip;