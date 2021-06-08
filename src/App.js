import 'App.scss';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import Loading from 'pages/Loading';
import Home from 'pages/Home';
import Baskets from 'pages/Baskets';
import HelloWorld from 'components/HelloWorld';
import LangSelector from 'components/LangSelector';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {

  /* page dimensions */
  const [windowHeight, setWindowHeight] = useState(0)
  const [windowWidth, setWindowWidth] = useState(0)
  
  useEffect(() => {
    const updateWindowDimensions = () => {
      setWindowHeight(window.innerHeight+'px')
      setWindowWidth(window.innerWidth+'px')
    }

    window.addEventListener('resize', updateWindowDimensions)
    updateWindowDimensions()

    return () => window.removeEventListener('resize', updateWindowDimensions);
  }, [])
  
  /* Redirection handling */
  const [redirect, setRedirect] = useState(null)

  /* i18n */
  const { i18n, ready } = useTranslation(null, { useSuspense: false });
  const [selectedLang, setSelectedLang] = useState('fr');

  const changeLanguage = (event) => {
    setSelectedLang(event.target.value);
    i18n.changeLanguage(event.target.value);
  }

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
      const result = await axios(apiUrl+endpoint);
      setData(result.data);
    } catch (error) {
      setFetchError(error);
      console.log("Fetch error", error)
    }

    setDataLoading(false);
  }

  useEffect(() => {
    ready && fetchData('products?lang='+selectedLang, setBaskets)
  }, [ready, selectedLang])

  /* useEffect(() => {
    baskets && console.log("baskets",baskets)
  }, [baskets]) */

  /* template */
  return (
    <div className="App" style={{ '--window-height': windowHeight, '--window-width': windowWidth }}>
      { ready
        ? 
          <Router>
            <Switch>
              <Route path="/lang">
                <HelloWorld />
                <LangSelector changeLanguage={changeLanguage} selectedLang={selectedLang} />
              </Route>
              <Route path="/baskets">
                { baskets
                  ? <Baskets setRedirect={setRedirect} baskets={baskets} />
                  : <Loading />
                }
              </Route>
              <Route path="/">
                <Home  setRedirect={setRedirect} />
              </Route>
            </Switch>
            { redirect && <Redirect to={redirect} /> }
          </Router>
        : 
          <Loading />
      }
    </div>
  );
}

export default App;
