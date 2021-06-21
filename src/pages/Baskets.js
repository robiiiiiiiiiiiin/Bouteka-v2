import './Baskets.scss';

import React, { useEffect } from 'react';

import Character from 'components/Character'
import Tooltip from 'components/Tooltip'
import SelectableItem from 'components/SelectableItem'
import Road from 'components/Road'
import Decor from 'components/Decor'

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

    const compareAttributes = (attributes1, attributes2) => {
        const attributes1_id = attributes1.map(attr => attr.id).sort()
        const attributes2_id = attributes2.map(attr => attr.id).sort()
        return JSON.stringify(attributes1_id) === JSON.stringify(attributes2_id)
    }

    const addBasketToCart = (basket) => {
        // reset chosenAttributes if the new basket doesn't have the same attributes as the precedent
        if(props.chosenBasket && !compareAttributes(basket.attributes, props.chosenBasket.attributes)) {
            props.setChosenOptions([])
        }
        props.setChosenBasket(basket)
        props.history.push('/options')
    }

    const items = []
    Object.values(baskets).forEach((basket, i) => {
        items.push(
            <SelectableItem key={basket.id} index={i} selected={basket.id === chosenBasketId} imgs={{bg: basketShadow, icon: basketIcon}} >
                {setSelected => (
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
                )}
            </SelectableItem>
        )
    })

    return (
        <div ref={ref} className="page baskets">
            <main className="wrapper">
                { !chosenBasketId && <Tooltip text={t('tooltip.chooseBasket')} /> }
                <ul className="baskets">
                    { items }
                </ul>
                <Character options={{}} />
                <Road />
                <Decor />
            </main>
        </div>
    )
})

export default Baskets;