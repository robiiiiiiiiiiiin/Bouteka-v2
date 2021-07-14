import './Baskets.scss';

import React, { useEffect, Dispatch, SetStateAction } from 'react';
import { History } from 'history';

import Character from 'components/Character'
import Tooltip from 'components/Tooltip'
import SelectableItem from 'components/SelectableItem'
import Road from 'components/Road'
import Decor from 'components/Decor'

import basketIcon from 'assets/img/basket.svg'
import basketShadow from 'assets/img/basketShadow.svg'

import Basket from 'models/Basket';
import BasketAttr from 'models/BasketAttr';
import ChosenBasketAttr from 'models/ChosenBasketAttr';

import { useTranslation } from 'react-i18next';

type BasketsProps = {
    chosenBasket: Basket | null;
    baskets: Array<Basket>;
    setChosenBasketAttrs: Dispatch<SetStateAction<Array<ChosenBasketAttr>>>;
    setChosenBasket: Dispatch<SetStateAction<Basket | null>>;
    history: History;
}

const Baskets = React.forwardRef<HTMLDivElement, BasketsProps>((props, ref) => {
    const { t } = useTranslation();
    const chosenBasketId = (props.chosenBasket) ? props.chosenBasket.id : null

    useEffect(() => {
    }, [])

    const compareAttributes = (attributes1: Array<BasketAttr>, attributes2: Array<BasketAttr>) => {
        const attributes1_id = attributes1.map(attr => attr.id).sort()
        const attributes2_id = attributes2.map(attr => attr.id).sort()
        return JSON.stringify(attributes1_id) === JSON.stringify(attributes2_id)
    }

    const addBasketToCart = (basket: Basket) => {
        // reset chosenAttributes if the new basket doesn't have the same attributes as the precedent
        if (props.chosenBasket && !compareAttributes(basket.attributes, props.chosenBasket.attributes)) {
            props.setChosenBasketAttrs([])
        }
        props.setChosenBasket(basket)
        props.history.push('/options')
    }

    const items: Array<JSX.Element> = []
    Object.values(props.baskets).forEach((basket, i) => {
        items.push(
            <SelectableItem key={basket.id} index={i} selected={basket.id === chosenBasketId} imgs={{ bg: basketShadow, icon: basketIcon }} >
                {(/* setSelected */) => {
                    const instock = basket.stock_status !== "outofstock"
                    return (
                        <div className='banner'>
                            <div className="header">
                                <h2 className="title">{basket.name}</h2>
                                <span className="price">chf {basket.price}</span>
                            </div>
                            <div className="content">
                                <p className="text" dangerouslySetInnerHTML={{ __html: basket.parsed_short_description }}></p>
                            </div>
                            <button className="basket-btn-add button primary" onClick={() => addBasketToCart(basket)} disabled={!instock}> {instock ? t('form.choose') : t('form.outOfStock') }</button>
                        </div>
                    )
                }}
            </SelectableItem>
        )
    })

    return (
        <div ref={ref} className="page baskets">
            <main className="wrapper">
                {!chosenBasketId && <Tooltip text={t('tooltip.chooseBasket')} />}
                <ul className="basket-list">
                    {items}
                </ul>
                <Character options={{}} />
                <Road />
                <Decor />
            </main>
        </div>
    )
})

export default Baskets;