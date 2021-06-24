import 'App.scss';

import React, { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import axios from 'axios';

import Loading from 'pages/Loading';
import Home from 'pages/Home';
import Baskets from 'pages/Baskets';
import Options from 'pages/Options';
import Cashier from 'pages/Cashier';
import LangSelector from 'components/LangSelector';
import useStateWithLS from 'components/useStateWithLS';

import Basket from 'models/Basket';
import BasketAttr from 'models/BasketAttr';
import ChosenBasketAttr from 'models/ChosenBasketAttr';
import Variation from 'models/Variation';
import Accessory from 'models/Accessory';

import { CSSTransition, TransitionGroup, } from 'react-transition-group';

function App() {

  /* page dimensions */
  const [windowHeight, setWindowHeight] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)
  const maxWidth = 375 // px
  const wrapperWidth = 0.95 // %

  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowHeight(window.innerHeight)
      setWindowWidth(window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight)
    }

    window.addEventListener('resize', updateWindowDimensions)
    updateWindowDimensions()

    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, [])

  /* Navigation */
  let history = useHistory()
  const location = useLocation()
  const loadingRef = useRef<HTMLDivElement>(null)
  const homeRef = useRef<HTMLDivElement>(null)
  const basketsRef = useRef<HTMLDivElement>(null)
  const optionsRef = useRef<HTMLDivElement>(null)
  const cashierRef = useRef<HTMLDivElement>(null)
  const nodeRefs = {
    '/': homeRef,
    '/baskets': basketsRef,
    '/options': optionsRef,
    '/cashier': cashierRef,
    '/loading': loadingRef
  }
  
  const currentPathname = location.pathname as keyof typeof nodeRefs
  const transitionBetwPagesDur: number = 600

  /* i18n */
  const { i18n, ready } = useTranslation(undefined, { useSuspense: false });
  const [selectedLang, setSelectedLang] = useState('fr');

  /* const changeLanguage = (event) => {
    setSelectedLang(event.target.value);
    i18n.changeLanguage(event.target.value);
  } */

  /* data */
  const apiUrl = process.env.REACT_APP_API_URL
  console.log("apiUrl",apiUrl)

  const [baskets, setBaskets] = useStateWithLS<Array<Basket>>('baskets', [])
  const [chosenBasket, setChosenBasket] = useStateWithLS<Basket | null>('chosenBasket', null)
  const [chosenBasketAttributes, setChosenBasketAttributes] = useStateWithLS<Array<ChosenBasketAttr>>('ChosenBasketAttrs', [])
  const [currentVariation, setCurrentVariation] = useStateWithLS<Variation | null>('currentVariation', null)

  const [accessories, setAccessories] = useStateWithLS<Array<Accessory>>('accessories', [])
  const [chosenAccessories, setChosenAccessories] = useStateWithLS<Array<Accessory>>('chosenAccessories', [])
  
  const [dataLoading, setDataLoading] = useState(false)
  const [error, setError] = useState<string | boolean>(false)

  /**
   * 
   * @param {string} endpoint the api endpoint to fetch
   * @param {function} setData the setState function to execute with the fetched data.
   */
  const fetchData = async (endpoint: string, setData: Dispatch<SetStateAction<any>>) => {
    setError(false);
    setDataLoading(true);

    try {
      const result = await axios(apiUrl + endpoint);
      setData(result.data);
    } catch (error) {
      setError(error);
      console.error("Fetch error", error)
    }

    setDataLoading(false);
  }

  // Convert special character to unicode in a string
  const unicodize = (string: string) => {
    return string.replace(/[\u007F-\uFFFF]/g, function (chr) {
      return `\\u${("0000" + chr.charCodeAt(0).toString(16)).substr(-4)}`
    })
  }

  // Load the baskets
  useEffect(() => {
    if (ready) fetchData('products/baskets?lang=' + selectedLang, setBaskets)
  }, [ready, selectedLang, setBaskets])
  
  // Load the accessories
  useEffect(() => {
    if (ready) fetchData('products/accessories?lang=' + selectedLang, setAccessories)
  }, [ready, selectedLang, setAccessories])

  // Search for the current variation depending on the chosen attributes
  const getCurrentVariation = () => {
      if (chosenBasket) {
        // Format the array of the attributes with chosen value
        const basketAttributes: object = chosenBasket.attributes.map(attribute => {
          const ChosenBasketAttr = chosenBasketAttributes.find(option => option.id === attribute.id)
          return {
            id: attribute.id,
            name: attribute.name,
            option: ChosenBasketAttr ? ChosenBasketAttr.option : "Sans"
          }
        })
        // fetch data
        fetchData(`products/baskets/${chosenBasket.id}/search-variation?attributes=${unicodize(JSON.stringify(basketAttributes))}`, setCurrentVariation)
      } else {
        setError("Can't get current variation if chosenBasket is null");
      }
  }

  useEffect(() => {
    currentVariation && console.log("useEffect currentVariation.id: ", currentVariation.id)
  }, [currentVariation])

  /* template */
  return (
    <div className="App" style={{
      ['--max-width' as any]: maxWidth + 'px',
      ['--wrapper-width' as any]: (wrapperWidth * 100) + "%",
      ['--window-height' as any]: windowHeight + 'px',
      ['--window-width' as any]: windowWidth + 'px',
      ['--window-width-95' as any]: (windowWidth * wrapperWidth) > maxWidth ? maxWidth + 'px' : (windowWidth * wrapperWidth) + 'px',
      ['--transition-betw-pages-dur' as any]: transitionBetwPagesDur + 'ms'
    }}>
      <TransitionGroup>
        <CSSTransition key={location.key} nodeRef={nodeRefs[currentPathname]} timeout={transitionBetwPagesDur} classNames="fade" >
          {ready
            ?
            <Switch location={location}>
              <Route path="/lang" >
                {/* <LangSelector changeLanguage={changeLanguage} selectedLang={selectedLang} /> */}
              </Route>
              <Route path="/baskets">
                {baskets.length
                  ? <Baskets ref={basketsRef} history={history} baskets={baskets} chosenBasket={chosenBasket} setChosenBasket={setChosenBasket} setChosenBasketAttrs={setChosenBasketAttributes} />
                  : <Loading ref={loadingRef} />
                }
              </Route>
              <Route path="/options">
                <Options ref={optionsRef} chosenBasket={chosenBasket as Basket} chosenBasketAttributes={chosenBasketAttributes} setChosenBasketAttributes={setChosenBasketAttributes} />
              </Route>
              <Route path="/cashier">
                <Cashier 
                  ref={cashierRef} history={history} 
                  chosenBasket={chosenBasket as Basket} chosenBasketAttributes={chosenBasketAttributes}
                  currentVariation={currentVariation} getCurrentVariation={getCurrentVariation} 
                  accessories={accessories} chosenAccessories={chosenAccessories} setChosenAccessories={setChosenAccessories} />
              </Route>
              <Route path="/">
                <Home ref={homeRef} history={history} />
              </Route>
            </Switch>
            :
            <Loading ref={loadingRef} />
          }
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
