import './Baskets.scss';

import React, { useState, useEffect } from 'react';

import Character from 'components/Character'
import Tooltip from 'components/Tooltip'
import OutsideClickHandler from 'components/OutsideClickHandler'

import grass from 'assets/img/grass.svg'
import treeSmall from 'assets/img/tree_1_small.svg'
import treeBig from 'assets/img/tree_1_big.svg'
import cart from 'assets/img/cart.svg'
/* import basketBig from 'assets/img/basket_big.svg'
import basketMedium from 'assets/img/basket_medium.svg'
import basketSmall from 'assets/img/basket_small.svg'
import basketShadowBig from 'assets/img/basketShadow_big.svg'
import basketShadowMedium from 'assets/img/basketShadow_medium.svg'
import basketShadowSmall from 'assets/img/basketShadow_small.svg' */
import basket from 'assets/img/basket.svg'
import basketShadow from 'assets/img/basketShadow.svg'

import { useTranslation } from 'react-i18next';

const Baskets = (props) => {
    const { t } = useTranslation();

    const baskets = {
        small: { ...props.baskets[0] },
        medium: { ...props.baskets[1] },
        big: { ...props.baskets[2] }
    }

    useEffect(() => {

    }, [])

    const addBasketToCart = () => { }

    const Item = (props) => {
        const [selected, setSelected] = useState(false)

        const closeModal = () => {
            setSelected(false)
        }

        return (
            <li className={`basket-item ${selected ? 'selected' : ''}`}>
                <OutsideClickHandler activated={selected} triggerThis={closeModal}>
                    <button className="basket-btn-toggle" onClick={() => setSelected(!selected)}>
                        <div className="composed-img basket-icon" role="img">
                            <img className="basket-shadow" src={basketShadow} alt="" />
                            <img className="basket-fg" src={basket} alt="" />
                        </div>
                    </button>
                    <div className={'basket-banner'}>
                        <div className="header">
                            <h2 className="basket-title">{props.basket.name}</h2>
                            <span className="price">chf {props.basket.price}</span>
                        </div>
                        <div className="basket-content">
                            <p className="text" dangerouslySetInnerHTML={{ __html: props.basket.parsed_short_description }}></p>
                        </div>
                        <button className="basket-btn-add button primary" onClick={() => addBasketToCart(props.basket.id)}>{t('choose')}</button>
                    </div>
                </OutsideClickHandler>
            </li>
        )
    }

    return (
        <div className="page baskets">
            <main className="wrapper">
                <Tooltip text={t('tooltip.chooseBasket')} />
                <ul className="baskets">
                    {
                        Object.entries(baskets).map(([size, basket]) => 
                            <Item key={basket.id} basket={basket} />
                        )
                    }
                    {/* <Item basket={baskets.small} />
                    <Item basket={baskets.medium} />
                    <Item basket={baskets.big} /> */}
                </ul>
                <Character options={{}} />
                <svg className="road" width="4000" height="150">
                    <rect width="100%" height="100%" />
                </svg> 
            </main>
        </div>
    )
}

export default Baskets;