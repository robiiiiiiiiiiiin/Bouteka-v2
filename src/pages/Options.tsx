import './Options.scss';

import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Link } from "react-router-dom";

import Character from 'components/Character'
import Tooltip from 'components/Tooltip'
import SelectableItem from 'components/SelectableItem'
import Road from 'components/Road'
import Decor from 'components/Decor'
import Cart from 'components/Cart'

import boxBg from 'assets/img/box_bg_carots.svg'
import boxFg from 'assets/img/box_fg_carots.svg'
import iconCarot from 'assets/img/product_carots.svg'

import { useTranslation } from 'react-i18next';

import BasketAttr from 'models/BasketAttr';
import Basket from 'models/Basket';
import ChosenBasketAttr from 'models/ChosenBasketAttr';
import BasketAttrOption from 'models/BasketAttrOption';

type OptionsProps = {
  chosenBasket: Basket;
  chosenBasketAttributes: Array<ChosenBasketAttr>;
  setChosenBasketAttributes: Dispatch<SetStateAction<Array<ChosenBasketAttr>>>;
}

const Options = React.forwardRef<HTMLDivElement, OptionsProps>((props, ref) => {
    const { t } = useTranslation();
    //const availableOptions = props.chosenBasket.attributes
    const availableOptions = [
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
      },
      {
        "id": 9,
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
    /* const availableOptions = []
    for(let i = 1; i <= 16; i++) {
      availableOptions.push({ id: i })
    } */
    const pageCount = Math.ceil(availableOptions.length / 4)
    const [currentPage, setCurrentPage] = useState(1)
    const [characterWalking, setCharacterWalking] = useState(false)
    const [animProductAdded, setAnimProductAdded] = useState(false)

    useEffect(() => {
    }, [])

    const move = (direction: string) => {
      setCharacterWalking(true)
      if (direction === "next") {
        setCurrentPage(currentPage+1)
      } else if (direction === "previous") {
        setCurrentPage(currentPage-1)
      }
      setTimeout(() => {
          setCharacterWalking(false)
      }, 2000)
    }

    const addOptionToCart = (product: BasketAttr, optionValue: string, optionPrice: string) => {
      props.setChosenBasketAttributes([...props.chosenBasketAttributes, {
        id: product.id,
        name: product.name,
        option: optionValue,
        price: optionPrice
      }])
      setAnimProductAdded(true)
      setTimeout(() => {
        setAnimProductAdded(false)
      }, 400)
    }

    type ProductProps = {
      setSelected: Dispatch<SetStateAction<boolean>>;
      product: BasketAttr;
    }

    const SimpleProduct = ({setSelected, product}: ProductProps) => {
      const name = product.name
      const { fullname, price } = product.processed_options[0]
      
      const handleAddProduct = () => {
        setSelected(false)
        addOptionToCart(product, fullname, price)
      }

      return (
        <div className='banner'>
            <div className="header">
                <h2 className="option-title">{name}</h2>
                <span className="price">chf{price}</span>
            </div>
            <button className="option-btn-add button primary" onClick={() => handleAddProduct()}>{t('add')}</button>
        </div>
      )
    }
    
    const VariableProduct = ({setSelected, product}: ProductProps) => {
      const name = product.name
      const [selectedVariation, setSelectedVariation] = useState<BasketAttrOption | null>(null)

      const handleAddProduct = () => {
        setSelected(false)
        if(selectedVariation) {
          addOptionToCart(product, selectedVariation.fullname, selectedVariation.price)
        }
      }

      return (
        <div className='banner'>
            <div className="header">
                <h2 className="option-title">{name}</h2>
            </div>
            <ul className="option-variations">
                {
                  product.processed_options.map(variation =>
                    <li key={variation.fullname} className="option-variation">
                      <label className={`button toggle ${(selectedVariation && selectedVariation.fullname === variation.fullname) && 'selected'}`} onClick={() => setSelectedVariation(variation)}>
                        <input type="radio" id={variation.name} name={name} value={variation.fullname} />
                        {variation.name}
                      </label>
                      <span className="price">chf{variation.price}</span>
                    </li>  
                  )
                }
            </ul>
            <button className="option-btn-add button primary" onClick={() => handleAddProduct()} disabled={!selectedVariation} >{t('add')}</button>
        </div>
      )
    }

    const items: Array<JSX.Element> = []
    Object.values(availableOptions).forEach((product, i) => {
        const optionIsInBasket = props.chosenBasketAttributes.filter(option => option.id === product.id).length > 0
        items.push(
            <SelectableItem key={`option_${product.id}`} index={i} imgs={{bg: boxBg, icon: (optionIsInBasket) ? '' : iconCarot, fg: boxFg}} disabled={optionIsInBasket} >
              { (setSelected: Dispatch<SetStateAction<boolean>>) => (
                product.isVariable ? <VariableProduct setSelected={setSelected} product={product} /> : <SimpleProduct  setSelected={setSelected} product={product} />
              )}
            </SelectableItem>
        )
    })

    const decors = []
    for(let i=1; i<=pageCount; i++) {
      decors.push(<Decor key={`decor_${i}`} index={i} />)
    }

    return (
        <div ref={ref} className="page options" style={{['--current-page' as any]: currentPage-1}}>
            <main className="wrapper">
                <Tooltip text={t('tooltip.addSomething')} />
                <ul className="products">
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
                    <Link className="button primary checkout" to="/cashier">{t('pagination.checkout')}</Link>
                  }
                </nav>
                <Cart animating={animProductAdded} chosenBasket={props.chosenBasket} chosenBasketAttributes={props.chosenBasketAttributes} setChosenBasketAttributes={props.setChosenBasketAttributes} />  
            </main>
            <div className='decorative-elems'>
              { decors }
            </div>
        </div>
    )
})

export default Options;