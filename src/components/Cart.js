import './Cart.scss'
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import SelectableItem from 'components/SelectableItem'
import OutsideClickHandler from 'components/OutsideClickHandler'

import cart from 'assets/img/cart.svg'
import cartShadow from 'assets/img/cartShadow.svg'
import iconCarot from 'assets/img/product_carots.svg'

const Cart = ({chosenOptions, setChosenOptions, chosenBasket, animating}) => {
    const { t } = useTranslation();
    const [cartOpen, setCartOpen] = useState(false)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        const basketPrice = parseFloat(chosenBasket.price)
        const cartPrice = chosenOptions.reduce((currentPrice, option2) => {
            return currentPrice + parseFloat(option2.price)
        }, basketPrice)
        setTotalPrice(cartPrice)
    }, [chosenOptions, chosenBasket])

    const optionItems = chosenOptions.map(option => {

        const removeFromCart = (idToRemove) => {
            const newArray = chosenOptions.filter(option => option.id !== idToRemove)
            setChosenOptions(newArray)
        }

        return (
            <SelectableItem key={`cart_option_${option.id}`} className="option" imgs={{ bg: cartShadow, icon: iconCarot }}>
                {setSelected => (
                    <div className='banner'>
                        <div className="header">
                            <span className="cart-item-title">{option.name}</span>
                            <span className="price">chf{option.price}</span>
                        </div>
                        <button className="button primary remove-from-cart" onClick={() => removeFromCart(option.id)}>{t('remove')}</button>
                    </div>
                )}
            </SelectableItem>
        )
    })

    return (
        <div className={`cart ${cartOpen ? 'opened' : ''}`} >
            <button id="cart-btn" className={`button secondary cart ${animating ? 'animating' : ''}`} onClick={() => setCartOpen(true)}>
                <img className="cart-icon" src={cart} alt="" />
            </button>
            <OutsideClickHandler activated={cartOpen} triggerThis={() => setCartOpen(false)}>
                <div className="content">
                    <div className="first-line">
                        <ul className="list-basket">
                            <SelectableItem key="cart_basket" imgs={{ bg: cartShadow, icon: cart }}>
                                {setSelected => (
                                    <div className='banner'>
                                        <div className="header">
                                            <h2 className="cart-item-title">{chosenBasket.name}</h2>
                                            <span className="price">chf {chosenBasket.price}</span>
                                        </div>
                                        <a className="button primary modify-basket" href="/baskets">{t('modify')}</a>
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