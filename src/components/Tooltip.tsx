import './Tooltip.scss'

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import cross from 'assets/img/cross.svg'

type TooltipProps = {
    text: string;
}

const Tooltip = (props: TooltipProps) => {
    const { t } = useTranslation();
    const [show, setShow] = useState(false)

    // Close the tooltip when a button is clicked
    useEffect(() => {
        const buttons = document.querySelectorAll('button')
        buttons.forEach(btn => {
            btn.addEventListener('click', () => setShow(false))
        })

        return () => {
            buttons.forEach(btn => {
                btn.removeEventListener('click', () => setShow(false))
            })
        }
    }, [])

    useEffect(() => {
        setShow(true)
    }, [])

    return (
        <div className={`tooltip ${show ? 'showing' : ''}`}>
            <p className="text">{props.text}</p>
            <button className="btn-cross" onClick={() => setShow(false)}>
                <img src={cross} alt="" className="cross" />
            </button>
        </div>
    )
}



export default Tooltip;