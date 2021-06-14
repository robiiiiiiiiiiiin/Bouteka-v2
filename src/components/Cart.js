import './Cart.scss'
import React from 'react';
import { useTranslation } from 'react-i18next';

import SelectableItem from 'components/SelectableItem'

import cart from 'assets/img/cart.svg'
import cartShadow from 'assets/img/cartShadow.svg'
import iconCarot from 'assets/img/product_carots.svg'

const Cart = (props) => {
    const { t } = useTranslation();

    const optionItems = props.chosenOptions.map(option => {

        const removeFromCart = (idToRemove) => {
            const indexToRemove = props.chosenOptions
                .map(option => option.id)
                .indexOf(idToRemove)
            props.setChosenOptions(props.chosenOptions.splice(indexToRemove, 1))
        }

        return (
            <SelectableItem key={`cart_option_${option.id}`} imgs={{bg: cartShadow, icon: iconCarot}}>
                { setSelected => (
                    <div className='banner'>
                        <div className="header">
                            <h2 className="cart-item-title">{option.name}</h2>
                            <span className="price">chf{option.price}</span>
                        </div>
                        <button className="button primary remove-from-cart" onClick={() => removeFromCart(option.id)}>{t('modify')}</button>
                    </div>
                )}
            </SelectableItem>
        )
    }) 

    return (
        <div className="cart" >
            <button className="button secondary cart">
                <img className="cart-icon" src={cart} alt="" />
            </button>
            <div className="content">
                <ul>
                    <SelectableItem imgs={{bg: cartShadow, icon: cart}}>
                        { setSelected => (
                            <div className='banner'>
                                <div className="header">
                                    <h2 className="cart-item-title">{props.chosenBasket.name}</h2>
                                    <span className="price">chf{props.chosenBasket.price}</span>
                                </div>
                                <a className="button primary modify-basket" href="/baskets">{t('modify')}</a>
                            </div>
                        )}
                    </SelectableItem>
                    { optionItems }
                </ul>
            </div>
        </div>
    )
}

export default Cart;