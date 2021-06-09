import './Baskets.scss';

import React, { useState, useEffect } from 'react';

import Character from 'components/Character'
import Tooltip from 'components/Tooltip'
import OutsideClickHandler from 'components/OutsideClickHandler'
import SelectableItem from 'components/SelectableItem'
import Road from 'components/Road'

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
import basketIcon from 'assets/img/basket.svg'
import basketShadow from 'assets/img/basketShadow.svg'

import { useTranslation } from 'react-i18next';

const Baskets = React.forwardRef((props, ref) => {
    const { t } = useTranslation();
    const chosenBasketId = (props.chosenBasket) ? props.chosenBasket.id : null

    const baskets = {
        small: { ...props.baskets[0] },
        medium: { ...props.baskets[1] },
        big: { ...props.baskets[2] }
    }

    useEffect(() => {
    }, [])

    const addBasketToCart = (basket) => {
        props.setChosenBasket(basket)
        props.history.push('/options')
    }

    /* const BasketItem = (props) => {
        const [selected, setSelected] = useState(props.basket.id === chosenBasketId || false)

        const closeModal = () => {
            setSelected(false)
        }

        return (
            <li className={`basket-item ${selected ? 'selected' : ''}`}>
                <OutsideClickHandler activated={selected} triggerThis={closeModal}>
                    <button className="btn-toggle" onClick={() => setSelected(!selected)}>
                        <div className="composed-img icon" role="img">
                            <img className="shadow" src={basketShadow} alt="" />
                            <img className="icon" src={basket} alt="" />
                        </div>
                    </button>
                    <div className='banner'>
                        <div className="header">
                            <h2 className="basket-title">{props.basket.name}</h2>
                            <span className="price">chf {props.basket.price}</span>
                        </div>
                        <div className="basket-content">
                            <p className="text" dangerouslySetInnerHTML={{ __html: props.basket.parsed_short_description }}></p>
                        </div>
                        <button className="basket-btn-add button primary" onClick={() => addBasketToCart(props.basket)}>{t('choose')}</button>
                    </div>
                </OutsideClickHandler>
            </li>
        )
    } */

    return (
        <div ref={ref} className="page baskets">
            <main className="wrapper">
                { !chosenBasketId && <Tooltip text={t('tooltip.chooseBasket')} /> }
                <ul className="baskets">
                    {
                        Object.entries(baskets).map(([size, basket]) => 
                            <SelectableItem key={basket.id} selected={basket.id === chosenBasketId}/* basket={basket} */ imgs={{bg: basketShadow, icon: basketIcon}} >
                                <div className='banner'>
                                    <div className="header">
                                        <h2 className="basket-title">{basket.name}</h2>
                                        <span className="price">chf {basket.price}</span>
                                    </div>
                                    <div className="basket-content">
                                        <p className="text" dangerouslySetInnerHTML={{ __html: basket.parsed_short_description }}></p>
                                    </div>
                                    <button className="basket-btn-add button primary" onClick={() => addBasketToCart(basket)}>{t('choose')}</button>
                                </div>
                            </SelectableItem>
                        )
                    }
                </ul>
                <Character options={{}} />
                <Road />
            </main>
        </div>
    )
})

export default Baskets;