import 'App.scss';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import axios from 'axios';

import Loading from 'pages/Loading';
import Home from 'pages/Home';
import Baskets from 'pages/Baskets';
import Options from 'pages/Options';
import Cashier from 'pages/Cashier';
import HelloWorld from 'components/HelloWorld';
import LangSelector from 'components/LangSelector';
import useStateWithLS from 'components/useStateWithLS';

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
  const loadingRef = useRef(null)
  const homeRef = useRef(null)
  const basketsRef = useRef(null)
  const optionsRef = useRef(null)
  const cashierRef = useRef(null)
  const nodeRefs = {
    '/': homeRef,
    '/baskets': basketsRef,
    '/options': optionsRef,
    '/cashier': cashierRef,
    '/loading': loadingRef
  }
  const transitionBetwPagesDur = 600

  /* i18n */
  const { i18n, ready } = useTranslation(null, { useSuspense: false });
  const [selectedLang, setSelectedLang] = useState('fr');

  const changeLanguage = (event) => {
    setSelectedLang(event.target.value);
    i18n.changeLanguage(event.target.value);
  }

  /* user data ( mostly cart ) */
  const [chosenBasket, setChosenBasket] = useStateWithLS('chosenBasket', null)
  const [chosenOptions, setChosenOptions] = useStateWithLS('chosenOptions', [])
  const [currentVariation, setCurrentVariation] = useStateWithLS('currentVariation', null)

  /* data fetching */
  const apiUrl = 'http://proxy.bouteka.ch/'
  const [dataLoading, setDataLoading] = useState(false)
  const [fetchError, setFetchError] = useState(false)
  const [baskets, setBaskets] = useStateWithLS('baskets', null)

  /**
   * 
   * @param {string} endpoint the api endpoint to fetch
   * @param {function} setData the setState function to execute with the fetched data.
   */
  const fetchData = async (endpoint, setData) => {
    setFetchError(false);
    setDataLoading(true);

    try {
      const result = await axios(apiUrl + endpoint);
      setData(result.data);
    } catch (error) {
      setFetchError(error);
      console.log("Fetch error", error)
    }

    setDataLoading(false);
  }

  // Convert special character to unicode in a string
  const unicodize = (string) => {
    return string.replace(/[\u007F-\uFFFF]/g, function (chr) {
      return `\\u${("0000" + chr.charCodeAt(0).toString(16)).substr(-4)}`
    })
  }

  useEffect(() => {
    ready && fetchData('products?lang=' + selectedLang, setBaskets)
  }, [ready, selectedLang, setBaskets])

  useEffect(() => {
    /* chosenBasket && console.log("useEffect chosenBasket: ", chosenBasket) */
  }, [chosenBasket])

  // Keep the currentVariation up to date with the user choices
  useEffect(() => {
    if (chosenBasket) {
      // Format the array of the attributes with chosen value
      const basketAttributes = chosenBasket.attributes.map(attribute => {
        const chosenOption = chosenOptions.find(option => option.id === attribute.id)
        return {
          id: attribute.id,
          name: attribute.name,
          option: chosenOption ? chosenOption.option : "Sans"
        }
      })
      // fetch data
      fetchData(`products/${chosenBasket.id}/search-variation?attributes=${unicodize(JSON.stringify(basketAttributes))}`, setCurrentVariation)
    }
  }, [chosenOptions, chosenBasket, setCurrentVariation])

  useEffect(() => {
    currentVariation && console.log("useEffect currentVariation: ", currentVariation)
  }, [currentVariation])

  /* template */
  return (
    <div className="App" style={{
      '--max-width': maxWidth + 'px',
      '--wrapper-width': (wrapperWidth * 100) + "%",
      '--window-height': windowHeight + 'px',
      '--window-width': windowWidth + 'px',
      '--window-width-95': (windowWidth * wrapperWidth) > maxWidth ? maxWidth + 'px' : (windowWidth * wrapperWidth) + 'px',
      '--transition-betw-pages-dur': transitionBetwPagesDur + 'ms'
    }}>
      <TransitionGroup>
        <CSSTransition key={location.key} nodeRef={nodeRefs[location.pathname]} timeout={transitionBetwPagesDur} classNames="fade" >
          {ready
            ?
            <Switch location={location}>
              <Route path="/lang" >
                <HelloWorld />
                <LangSelector changeLanguage={changeLanguage} selectedLang={selectedLang} />
              </Route>
              <Route path="/baskets">
                {baskets
                  ? <Baskets ref={basketsRef} history={history} baskets={baskets} chosenBasket={chosenBasket} setChosenBasket={setChosenBasket} setChosenOptions={setChosenOptions} />
                  : <Loading ref={loadingRef} />
                }
              </Route>
              <Route path="/options">
                <Options ref={optionsRef} chosenBasket={chosenBasket} chosenOptions={chosenOptions} setChosenOptions={setChosenOptions} />
              </Route>
              <Route path="/cashier">
                <Cashier ref={cashierRef} chosenOptions={chosenOptions} currentVariation={currentVariation} />
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
