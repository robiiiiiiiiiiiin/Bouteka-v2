import 'App.scss';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Loading from 'pages/Loading';
import Home from 'pages/Home';
import HelloWorld from 'components/HelloWorld';
import LangSelector from 'components/LangSelector';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {

  const { i18n, ready } = useTranslation(null, { useSuspense: false });
  const [selectedLang, setSelectedLang] = useState('fr');

  const changeLanguage = (event) => {
    setSelectedLang(event.target.value);
    i18n.changeLanguage(event.target.value);
  }

  return (
    <div className="App">
      { ready
        ? 
          <Router>
            <Switch>
              <Route path="/lang">
                <HelloWorld />
                <LangSelector changeLanguage={changeLanguage} selectedLang={selectedLang} />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
        : 
          <Loading />
      }
    </div>
  );
}

export default App;
