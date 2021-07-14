import './SelectableItem.scss'
import React, { useState } from 'react';

import OutsideClickHandler from 'components/OutsideClickHandler'


type SelectableItemProps = {
    index?: number;
    className?: string;
    imgs: {bg?: string, icon?: string, fg?: string};
    disabled?: boolean;
    selected?: boolean;
    children: any;
}

const SelectableItem = (props: SelectableItemProps) => {
    const [selected, setSelected] = useState(props.selected || false)
    const index = props.index || 0

    const closeModal = () => {
        setSelected(false)
    }

    return (
        <li className={`selectable-item ${selected ? 'selected' : ''} ${props.className || ''}`} style={{['--index' as any]: index+1}}>
            <OutsideClickHandler activated={selected} triggerThis={closeModal}>
                <button className="btn-toggle" onClick={() => setSelected(!selected)} disabled={!!props.disabled}>
                    <div className="composed-img" role="img">
                        { props.imgs.bg &&  <img className="bg" src={props.imgs.bg} alt="" draggable="false" /> }
                                            <img className="icon" src={props.imgs.icon} alt="" draggable="false" />
                        { props.imgs.fg &&  <img className="fg" src={props.imgs.fg} alt="" draggable="false" /> }
                    </div>
                </button>
                { props.children(setSelected) }
            </OutsideClickHandler>
        </li>
    )
}

export default SelectableItem;