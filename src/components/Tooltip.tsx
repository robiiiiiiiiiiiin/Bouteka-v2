import './Tooltip.scss'

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import cross from 'assets/img/cross.svg'

type TooltipProps = {
    text: string;
}

const Tooltip = ({ text }: TooltipProps) => {
    const { t } = useTranslation();
    const [show, setShow] = useState(false)

    useEffect(() => {
        setShow(true)

        /* const closeTooltip = () => {
            setShow(false)
        }

        document.addEventListener('mousedown', closeTooltip)
        return () => { 
            document.removeEventListener('mousedown', closeTooltip)
        } */
    }, [])

    return (
        <div className={`tooltip ${show ? 'showing' : ''}`}>
            <p className="text">{text}</p>
            <button className="btn-cross" onClick={() => setShow(false)}>
                <img src={cross} alt="" className="cross" />
            </button>
        </div>
    )
}



export default Tooltip;