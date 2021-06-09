import './Options.scss';

import React, { useState, useEffect } from 'react';

import Character from 'components/Character'
import Tooltip from 'components/Tooltip'
import OutsideClickHandler from 'components/OutsideClickHandler'
import Road from 'components/Road'

import grass from 'assets/img/grass.svg'
import treeSmall from 'assets/img/tree_1_small.svg'
import treeBig from 'assets/img/tree_1_big.svg'
import cart from 'assets/img/cart.svg'

import { useTranslation } from 'react-i18next';

const Options = React.forwardRef((props, ref) => {
    const { t } = useTranslation();
    const options = props.chosenBasket.attributes

    useEffect(() => {
    }, [])

    return (
        <div ref={ref} className="page options">
            <main className="wrapper">
                <Tooltip text={t('tooltip.addSomething')} />
                <ul className="products">
                    {
                        /* Object.entries(options).map(([key, option]) => 
                            <OptionItem key={option.id} option={option} />
                        ) */
                    }
                </ul>
                <Character options={{ hasBasket: true }} />
                <Road />
            </main>
        </div>
    )
})

export default Options;