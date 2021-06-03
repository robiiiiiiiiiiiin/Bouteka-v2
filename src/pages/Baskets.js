import './Baskets.scss';

import React, { useState } from 'react';

import Character from 'components/Character'
import Tooltip from 'components/Tooltip'

import grass from 'assets/img/grass.svg'
import treeSmall from 'assets/img/tree_1_small.svg'
import treeBig from 'assets/img/tree_1_big.svg'
import cart from 'assets/img/cart.svg'
import basketBig from 'assets/img/basket_big.svg'
import basketMedium from 'assets/img/basket_medium.svg'
import basketSmall from 'assets/img/basket_small.svg'
import basketShadowBig from 'assets/img/basketShadow_big.svg'
import basketShadowMedium from 'assets/img/basketShadow_medium.svg'
import basketShadowSmall from 'assets/img/basketShadow_small.svg'

import { useTranslation } from 'react-i18next';

const Baskets = (props) => {
    const { t } = useTranslation();
    const [animated, setAnimated] = useState(false)
    const [characterWalking, setCharacterWalking] = useState(false)

    const baskets = {
        small: {
            shadow: basketShadowSmall,
            fg: basketSmall,
            ...props.baskets[0]
        },
        medium: {
            shadow: basketShadowMedium,
            fg: basketMedium,
            ...props.baskets[1]
        },
        big: {
            shadow: basketShadowBig,
            fg: basketBig,
            ...props.baskets[2]
        }
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

    const addBasketToCart = () => {}

    const Item = (size) => (
        <li className="basket-item">
            <div className="composed-img basket-icon" role="img">
                <img className="basket-shadow" src={baskets.small.shadow} alt="" />
                <img className="basket-fg" src={baskets.small.fg} alt="" />
            </div>
            <div className="description">
                <h2 className="basket-title">{baskets.small.title}</h2>
                <div className="basket-content">{baskets.small.content}</div>
                <button role="button" className="button primary" onClick={addBasketToCart(baskets.small.id)}>{t('choose')}</button>
            </div>
        </li>
    )

    return (
        <div className="page baskets">
            <main className="wrapper">
                <Tooltip text={t('tooltip.chooseBasket')} />
                <ul className="baskets">
                    <Item size="small" />
                    <Item size="medium" />
                    <Item size="big" />
                </ul>
                <Character />
            </main>
        </div>
    )
}

export default Baskets;