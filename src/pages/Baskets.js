import './Baskets.scss';

import React, { useState } from 'react';

import Character from 'components/Character'
import Tooltip from 'components/Tooltip'

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
    const [animated, setAnimated] = useState(false)
    const [characterWalking, setCharacterWalking] = useState(false)

    const baskets = {
        small: { ...props.baskets[0] },
        medium: { ...props.baskets[1] },
        big: { ...props.baskets[2] }
    }

    const animate = () => {
        setAnimated(true)
        setTimeout(() => {
            setCharacterWalking(true)
        }, 1350)
        setTimeout(() => {
            setCharacterWalking(false)
            props.setRedirect('/baskets')
        }, 3350)
    }

    const addBasketToCart = () => { }

    const Item = (props) => {
        return (
            <li className="basket-item">
                <div className="composed-img basket-icon" role="img">
                    <img className="basket-shadow" src={basketShadow} alt="" />
                    <img className="basket-fg" src={basket} alt="" />
                </div>
                <div className={`basket-banner ${props.selected ? '' : 'hidden'}`}>
                    <div className="header">
                        <h2 className="basket-title">{props.basket.name}</h2>
                        <span className="price">{props.basket.price}</span>
                    </div>
                    <div className="basket-content" dangerouslySetInnerHTML={{ __html: props.basket.parsed_short_description }}></div>
                    <button className="button primary" onClick={addBasketToCart(props.basket.id)}>{t('choose')}</button>
                </div>
            </li>
        )
    }

    return (
        <div className="page baskets">
            <main className="wrapper">
                <Tooltip text={t('tooltip.chooseBasket')} />
                <ul className="baskets">
                    <Item basket={baskets.small} selected={true}/>
                    <Item basket={baskets.medium} selected={false} />
                    <Item basket={baskets.big} selected={false} />
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