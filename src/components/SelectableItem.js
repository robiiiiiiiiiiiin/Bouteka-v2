import React, { useState } from 'react';

import OutsideClickHandler from 'components/OutsideClickHandler'

const SelectableItem = (props) => {
    const [selected, setSelected] = useState(props.selected || false)

    const closeModal = () => {
        setSelected(false)
    }

    return (
        <li className={`selectable-item ${selected ? 'selected' : ''}`}>
            <OutsideClickHandler activated={selected} triggerThis={closeModal}>
                <button className="btn-toggle" onClick={() => setSelected(!selected)}>
                    <div className="composed-img" role="img">
                        { props.imgs.bg &&  <img className="bg" src={props.imgs.bg} alt="" /> }
                                            <img className="icon" src={props.imgs.icon} alt="" />
                        { props.imgs.fg &&  <img className="fg" src={props.imgs.fg} alt="" /> }
                    </div>
                </button>
                { props.children }
            </OutsideClickHandler>
        </li>
    )
}

export default SelectableItem;