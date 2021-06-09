import './Options.scss';

import React, { useState, useEffect } from 'react';

import Character from 'components/Character'
import Tooltip from 'components/Tooltip'
import SelectableItem from 'components/SelectableItem'
import Road from 'components/Road'

import grass from 'assets/img/grass.svg'
import treeSmall from 'assets/img/tree_1_small.svg'
import treeBig from 'assets/img/tree_1_big.svg'
import cart from 'assets/img/cart.svg'
import boxBg from 'assets/img/box_bg_carots.svg'
import boxFg from 'assets/img/box_fg_carots.svg'
import iconCarot from 'assets/img/product_carots.svg'

import { useTranslation } from 'react-i18next';

const Options = React.forwardRef((props, ref) => {
    const { t } = useTranslation();
    //const options = props.chosenBasket.attributes
    const options = [
        {
          "id": 1
        },
        {
          "id": 2
        },
        {
          "id": 3
        },
        {
          "id": 4
        },
        {
          "id": 5
        },
        {
          "id": 6
        }
      ]
    console.log("length: ",Object.keys(options).length)

    useEffect(() => {
    }, [])

    const items = [] 
    Object.values(options).forEach((option, i) => {
        items.push(
            <SelectableItem key={option.id} index={i} imgs={{bg: boxBg, icon: iconCarot, fg: boxFg}} >

            </SelectableItem>
        )
    })

    return (
        <div ref={ref} className="page options">
            <main className="wrapper">
                <Tooltip text={t('tooltip.addSomething')} />
                <ul className="products">
                    { items }
                </ul>
                <Character options={{ hasBasket: true }} />
                <Road />
            </main>
        </div>
    )
})

export default Options;