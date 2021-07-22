import './Cart.scss'
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

import SelectableItem from 'components/SelectableItem'
import OutsideClickHandler from 'components/OutsideClickHandler'

import cart from 'assets/img/cart.svg'
import cart_with_arm from 'assets/img/cart_with_arm.svg'
import cartShadow from 'assets/img/cartShadow.svg'
import product_default from 'assets/img/product_default.svg'

import ChosenBasketAttr from 'models/ChosenBasketAttr';
import Basket from 'models/Basket';

type CartProps = {
    chosenBasketAttributes: Array<ChosenBasketAttr>;
    setChosenBasketAttributes: Dispatch<SetStateAction<Array<ChosenBasketAttr>>>;
    chosenBasket: Basket;
    animating: boolean;
}

const Cart = ({chosenBasketAttributes, setChosenBasketAttributes, chosenBasket, animating}: CartProps) => {
    const { t } = useTranslation();
    const [cartOpen, setCartOpen] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        const basketPrice = parseFloat(chosenBasket.price)
        const cartPrice = chosenBasketAttributes.reduce((currentPrice, option2) => {
            return currentPrice + parseFloat(option2.price)
        }, basketPrice)
        setTotalPrice(cartPrice)
    }, [chosenBasketAttributes, chosenBasket])

    const optionItems = chosenBasketAttributes.map(option => {
        /* Fetch product icons dynamically */
        let product_icon
        try {
          product_icon = require(`assets/img/product_${option.name}.svg`).default
        } catch {
          product_icon = product_default
        }

        const removeFromCart = (idToRemove: number) => {
            const newArray = chosenBasketAttributes.filter(option => option.id !== idToRemove)
            setChosenBasketAttributes(newArray)
        }

        return (
            <SelectableItem key={`cart_option_${option.id}`} className="option" imgs={{ bg: cartShadow, icon: product_icon }}>
                {(/* setSelected */) => (
                    <div className='banner'>
                        <div className="header">
                            <span className="cart-item-title">{option.name}</span>
                            <span className="price">chf{option.price}</span>
                        </div>
                        <button className="button primary remove-from-cart" onClick={() => removeFromCart(option.id)}>{t('form.remove')}</button>
                    </div>
                )}
            </SelectableItem>
        )
    })

    return (
        <div className={`cart ${cartOpen ? 'opened' : ''}`} >
            <button id="cart-btn" className={`button secondary cart ${animating ? 'animating' : ''}`} onClick={() => setCartOpen(true)}>
                <img className="cart-icon" src={cart_with_arm} alt="" draggable="false" />
            </button>
            <OutsideClickHandler activated={cartOpen} triggerThis={() => setCartOpen(false)}>
                <div className="content">
                    <div className="first-line">
                        <ul className="list-basket">
                            <SelectableItem key="cart_basket" imgs={{ bg: cartShadow, icon: cart }}>
                                {(/* setSelected */) => (
                                    <div className='banner'>
                                        <div className="header">
                                            <h2 className="cart-item-title">{chosenBasket.name}</h2>
                                            <span className="price">chf {chosenBasket.price}</span>
                                        </div>
                                        <Link to="/baskets" className="button primary modify-basket">{t('form.modify')}</Link>
                                    </div>
                                )}
                            </SelectableItem>
                        </ul>
                        <span className="price">chf {totalPrice.toLocaleString('fr-CH', { minimumFractionDigits: 2 })}</span>
                    </div>
                    {optionItems.length > 0 &&
                        <ul className="list-options">
                            {optionItems}
                        </ul>
                    }
                </div>
            </OutsideClickHandler>
        </div>
    )
}

export default Cart;