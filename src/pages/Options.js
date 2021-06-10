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
    //const optional_products = props.chosenBasket.attributes
    const optional_products = [
      {
        "id": 3,
        "name": "4 œufs",
        "position": 4,
        "visible": false,
        "variation": true,
        "options": [
          "Avec (Supplément CHF 4.00)",
          "Sans"
        ],
        "isVariable": false,
        "processed_options": [
          {
            "fullname": "Avec (Supplément CHF 4.00)",
            "name": "Avec",
            "price": " 4.00"
          }
        ]
      },
      {
        "id": 6,
        "name": "Pan levain",
        "position": 5,
        "visible": false,
        "variation": true,
        "options": [
          "Baguette 250g (Supplément CHF 2.00)",
          "Mi-blanc 500g (Supplément CHF 3.00)",
          "Sans"
        ],
        "isVariable": true,
        "processed_options": [
          {
            "fullname": "Baguette 250g (Supplément CHF 2.00)",
            "name": "Baguette 250g",
            "price": " 2.00"
          },
          {
            "fullname": "Mi-blanc 500g (Supplément CHF 3.00)",
            "name": "Mi-blanc 500g",
            "price": " 3.00"
          }
        ]
      },
      {
        "id": 5,
        "name": "400g pâtes blé dur en vrac",
        "position": 6,
        "visible": false,
        "variation": true,
        "options": [
          "Avec (Supplément CHF 3.00)",
          "Sans"
        ],
        "isVariable": false,
        "processed_options": [
          {
            "fullname": "Avec (Supplément CHF 3.00)",
            "name": "Avec",
            "price": " 3.00"
          }
        ]
      },
      {
        "id": 4,
        "name": "Tsanpinyon",
        "position": 7,
        "visible": false,
        "variation": true,
        "options": [
          "250g (Supplément CHF 2.50)",
          "500g (Supplément CHF 4.50)",
          "Sans"
        ],
        "isVariable": true,
        "processed_options": [
          {
            "fullname": "250g (Supplément CHF 2.50)",
            "name": "250g",
            "price": " 2.50"
          },
          {
            "fullname": "500g (Supplément CHF 4.50)",
            "name": "500g",
            "price": " 4.50"
          }
        ]
      }
    ]
    /* for(let i = 10; i <= 16; i++) {
      optional_products.push({ id: i })
    } */
    const pageCount = Math.ceil(optional_products.length / 4)
    const [currentPage, setCurrentPage] = useState(1)
    const [characterWalking, setCharacterWalking] = useState(false)

    useEffect(() => {
    }, [])

    const move = (direction) => {
      setCharacterWalking(true)
      if (direction == "next") {
        setCurrentPage(currentPage+1)
      } else if (direction == "previous") {
        setCurrentPage(currentPage-1)
      }
      setTimeout(() => {
          setCharacterWalking(false)
      }, 2000)
    }

    const addOptionToCart = () => {

    }

    const SimpleProduct = ({product}) => {
      const name = product.name
      const { fullname, price } = product.processed_options[0]

      return (
        <div className='banner'>
            <div className="header">
                <h2 className="option-title">{name}</h2>
                <span className="price">chf{price}</span>
            </div>
            <button className="option-btn-add button primary" onClick={() => addOptionToCart()}>{t('add')}</button>
        </div>
      )
    }
    
    const VariableProduct = ({product}) => {
      const name = product.name
      const [selectedVariation, setSelectedVariation] = useState(null)

      return (
        <div className='banner'>
            <div className="header">
                <h2 className="option-title">{name}</h2>
            </div>
            <ul className="option-variations">
                {
                  product.processed_options.map(variation =>
                    <li key={variation.fullname} className="option-variation">
                      <label className={`button toggle ${(selectedVariation == variation.fullname) && 'selected'}`} onClick={() => setSelectedVariation(variation.fullname)}>
                        <input type="radio" id={variation.name} name={name} value={variation.fullname} />
                        {variation.name}
                      </label>
                      <span className="price">chf{variation.price}</span>
                    </li>  
                  )
                }
            </ul>
            <button className="option-btn-add button primary" onClick={() => addOptionToCart()}>{t('add')}</button>
        </div>
      )
    }

    const items = []
    Object.values(optional_products).forEach((product, i) => {
        items.push(
            <SelectableItem key={product.id} index={i} imgs={{bg: boxBg, icon: iconCarot, fg: boxFg}} >
              { 
                product.isVariable ? <VariableProduct product={product} /> : <SimpleProduct  product={product} />
              }
            </SelectableItem>
        )
    })

    return (
        <div ref={ref} className="page options">
            <main className="wrapper">
                <Tooltip text={t('tooltip.addSomething')} />
                <ul className="products" style={{'--current-page': currentPage-1}}>
                    { items }
                </ul>
                <Character options={{ hasBasket: true, isWalking: characterWalking }} />
                <Road />
                <nav className="navbar">
                  { currentPage > 1 &&
                    <button className="button secondary previous" onClick={() => move("previous")}>{t('pagination.previous')}</button>
                  }
                  { currentPage < pageCount &&
                    <button className="button secondary next" onClick={() => move("next")}>{t('pagination.next')}</button>
                  }
                  { currentPage >= pageCount &&
                    <button className="button primary checkout">{t('pagination.checkout')}</button>
                  }
                </nav>
            </main>
        </div>
    )
})

export default Options;