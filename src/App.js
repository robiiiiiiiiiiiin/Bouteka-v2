import 'App.scss';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import axios from 'axios';

import Loading from 'pages/Loading';
import Home from 'pages/Home';
import Baskets from 'pages/Baskets';
import Options from 'pages/Options';
import HelloWorld from 'components/HelloWorld';
import LangSelector from 'components/LangSelector';

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
  const nodeRefs = {
    '/': homeRef,
    '/baskets': basketsRef,
    '/options': optionsRef,
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
  const [chosenBasket, setChosenBasket] = useState(null)
  const [chosenOptions, setChosenOptions] = useState([])

  /* data fetching */
  const apiUrl = 'https://proxy.bouteka.ch/'
  const [dataLoading, setDataLoading] = useState(false)
  const [fetchError, setFetchError] = useState(false)
  const [baskets, setBaskets] = useState(null)

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

  useEffect(() => {
    ready && fetchData('products?lang=' + selectedLang, setBaskets)
  }, [ready, selectedLang])

  useEffect(() => {
    /* chosenBasket && console.log("useEffect chosenBasket: ", chosenBasket) */
  }, [chosenBasket])
  
  useEffect(() => {
    /* chosenOptions && console.log("useEffect chosenOptions: ", chosenOptions) */
  }, [chosenOptions])

  /* template */
  return (
    <div className="App" style={{
      '--max-width': maxWidth+'px',
      '--wrapper-width': (wrapperWidth*100)+"%",
      '--window-height': windowHeight + 'px',
      '--window-width': windowWidth + 'px',
      '--window-width-95': (windowWidth * wrapperWidth) > maxWidth ? maxWidth + 'px' : (windowWidth * wrapperWidth) + 'px',
      '--transition-betw-pages-dur': transitionBetwPagesDur + 'ms' }}>
      <TransitionGroup>
        <CSSTransition key={location.key} nodeRef={nodeRefs[location.pathname]} timeout={transitionBetwPagesDur} classNames="fade" >
          {ready
            ?
            <Switch location={location}>
              <Route path="/lang" >
                <HelloWorld />
                <LangSelector changeLanguage={changeLanguage} selectedLang={selectedLang} />
              </Route>
              <Route path="/options">
                <Options ref={optionsRef} history={history} chosenBasket={chosenBasket} chosenOptions={chosenOptions} setChosenOptions={setChosenOptions} />
              </Route>
              <Route path="/baskets">
                {baskets
                  ? <Baskets ref={basketsRef} history={history} baskets={baskets} chosenBasket={chosenBasket} setChosenBasket={setChosenBasket} />
                  : <Loading ref={loadingRef} />
                }
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
