import './Tooltip.scss'

import React, { useState, useEffect } from 'react';

const Tooltip = (props) => {
    const [show, setShow] = useState(false)

    useEffect(() => {
        setShow(true)
        
        const handleClick = () => {
            setShow(false)
        }

        document.addEventListener('mousedown', handleClick)
        return () => { 
            document.removeEventListener('mousedown', handleClick)
        }
    }, [])

    return (
        <div className={`tooltip ${show ? 'showing' : ''}`}>
            <p className="text">{props.text}</p>
        </div>
    )
}



export default Tooltip;