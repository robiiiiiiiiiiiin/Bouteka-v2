import 'App.scss';

import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, Route, useLocation, useHistory, Redirect } from "react-router-dom";
import axios, { AxiosResponse } from 'axios';

import { checkPath } from 'components/helpers'

import Loading from 'pages/Loading';
import Offline from 'pages/Offline';
import Error from 'pages/Error';
import Home from 'pages/Home';
import Baskets from 'pages/Baskets';
import Options from 'pages/Options';
import Cashier from 'pages/Cashier';
import useStateWithLS from 'components/useStateWithLS';

import Basket from 'models/Basket';
import ChosenBasketAttr from 'models/ChosenBasketAttr';
import Variation from 'models/Variation';
import Accessory from 'models/Accessory';

import { CSSTransition, TransitionGroup, } from 'react-transition-group';
import ShippingMethod from 'models/ShippingMethod';
import Order from 'models/Order';
import Customer from 'models/Customer';

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

  /* i18n */
  const { ready } = useTranslation(undefined, { useSuspense: false });
  const [selectedLang, setSelectedLang] = useState('fr');

  /* const changeLanguage = (event) => {
    setSelectedLang(event.target.value);
    i18n.changeLanguage(event.target.value);
  } */

  /* online / offline handling */
  const checkConnection = () => {
    if (navigator.onLine) {
      fetch(window.location.hostname, { method: 'HEAD', mode: 'no-cors' })
        .then(function () {
          setIsOnline(true)
        })
        .catch(function () {
          setIsOnline(false)
        });
    } else {
      setIsOnline(false)
    }
  }

  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    window.addEventListener('online', checkConnection);
    window.addEventListener('offline', checkConnection);
    checkConnection()

    return () => {
      window.removeEventListener('online', checkConnection);
      window.removeEventListener('offline', checkConnection);
    }
  }, [])

  /* data */
  const apiUrl = process.env.REACT_APP_API_URL

  const [baskets, setBaskets] = useState<Array<Basket>>([])
  const [chosenBasket, setChosenBasket] = useStateWithLS<Basket | null>('chosenBasket', null)
  const [chosenBasketAttributes, setChosenBasketAttributes] = useStateWithLS<Array<ChosenBasketAttr>>('chosenBasketAttrs', [])
  const [currentVariation, setCurrentVariation] = useStateWithLS<Variation | null>('currentVariation', null)

  const [accessories, setAccessories] = useState<Array<Accessory>>([])
  const [chosenAccessories, setChosenAccessories] = useStateWithLS<Array<Accessory>>('chosenAccessories', [])

  const [shippingMethods, setShippingMethods] = useState<Array<ShippingMethod>>([])
  const [chosenShippingMethod, setChosenShippingMethod] = useStateWithLS<ShippingMethod | null>('chosenShippingMethod', null)

  const [currentCustomer, setCurrentCustomer] = useStateWithLS<Customer | null>('currentCustomer', null);

  const [createdOrder, setCreatedOrder] = useStateWithLS<Order | null>('createdOrder', null)

  const [basketsLoading, setBasketsLoading] = useState(!!baskets.length)
  //const [currentVariationLoading, setCurrentVariationLoading] = useState(!!currentVariation)
  const [accessoriesLoading, setAccessoriesLoading] = useState(!!accessories.length)
  const [shippingMethodsLoading, setShippingMethodsLoading] = useState(!!shippingMethods.length)
  const [error, setError] = useState<string | boolean>(false)

  const currentPageLoading = () => {
    switch (location.pathname) {
      case "/baskets":
        return basketsLoading
      case "/options":
        return basketsLoading
      case "/cashier":
        return accessoriesLoading || shippingMethodsLoading
      default:
        return false
    }
  }
  
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

  // Return the current page, even for the pages like the loading page that are never in the location.pathname
  const wantedCurrentLocation = (): keyof typeof nodeRefs => {
    // We don't want a clean transition for the error page. SO we return the requested page
    if(!isOnline || error) return location.pathname as keyof typeof nodeRefs
    // We want a clean transition with the loading page
    else if(currentPageLoading()) return "/loading"
    // Normal behaviour
    else return location.pathname as keyof typeof nodeRefs
  }
  const currentPathname = location.pathname as keyof typeof nodeRefs
  const transitionBetwPagesDur: number = 600

  /**
   * 
   * @param {string} endpoint the api endpoint to fetch
   * @param {function} setData the setState function to execute with the fetched data.
   */
  const fetchData = async (endpoint: string, setData: Dispatch<SetStateAction<any>>, setDataLoading: Dispatch<SetStateAction<any>> | null = null) => {
    setError(false);
    checkConnection();
    if (setDataLoading) setDataLoading(true)

    try {
      const result = await axios(apiUrl + endpoint);
      setData(result.data);
    } catch (error) {
      setError(checkPath(error, 'response.data.message') ? error.response.data.message : "Erreur de communication avec le serveur. Veuillez svp passer votre commande sur bouteka.ch");
      console.error("Fetch error", error)
    }

    if (setDataLoading) setDataLoading(false)
  }

  const createOrder = async () => {
    checkConnection()
    try {
      const order: AxiosResponse<any> = await axios({
        url: apiUrl + 'orders',
        method: 'post',
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({
          customer: currentCustomer,
          basket: chosenBasket,
          variation: currentVariation,
          accessories: chosenAccessories,
          shipping: chosenShippingMethod
        })
      });
      setCreatedOrder(order.data)
      console.log("createdOrder", order.data)
    } catch (error) {
      setError(checkPath(error, 'response.data.message') ? error.response.data.message : "Erreur de communication avec le serveur. Veuillez svp passer votre commande sur bouteka.ch")
    }
  }

  // Convert special character to unicode in a string
  const unicodize = (string: string) => {
    return string.replace(/[\u007F-\uFFFF]/g, function (chr) {
      return `\\u${("0000" + chr.charCodeAt(0).toString(16)).substr(-4)}`
    })
  }

  // Load the baskets
  useEffect(() => {
    if (ready) fetchData('products/baskets?lang=' + selectedLang, setBaskets, setBasketsLoading)
  }, [ready, selectedLang, setBaskets])

  // Load the accessories
  useEffect(() => {
    if (ready) fetchData('products/accessories?lang=' + selectedLang, setAccessories, setAccessoriesLoading)
  }, [ready, selectedLang, setAccessories])

  // Load the shipping methods
  useEffect(() => {
    if (ready) fetchData('orders/shipping-methods', setShippingMethods, setShippingMethodsLoading)
  }, [ready, setShippingMethods])

  // Reset createdOrder if user change something in his cart
  useEffect(() => {
    setCreatedOrder(null)
  }, [chosenBasket, chosenBasketAttributes, chosenAccessories, chosenShippingMethod, currentCustomer])

  // Search for the current variation depending on the chosen attributes
  const getCurrentVariation = () => {
    if (chosenBasket) {
      // Format the array of the attributes with chosen value
      const basketAttributes: object = chosenBasket.attributes.map(attribute => {
        const attrInCart = chosenBasketAttributes.find(option => option.id === attribute.id)
        return {
          id: attribute.id,
          name: attribute.name,
          option: attrInCart ? attrInCart.option : "Sans"
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
        <CSSTransition key={wantedCurrentLocation()} nodeRef={nodeRefs[wantedCurrentLocation()]} timeout={transitionBetwPagesDur} classNames="fade" >
          {isOnline
            ?
            error
              ?
              <Error selectedLang={selectedLang} />
              :
              ready && !currentPageLoading()
                ?
                <Switch location={location}>
                  <Route path="/baskets">
                    <Baskets ref={basketsRef} history={history} baskets={baskets} chosenBasket={chosenBasket} setChosenBasket={setChosenBasket} setChosenBasketAttrs={setChosenBasketAttributes} />
                  </Route>
                  <Route path="/options">
                    {chosenBasket
                      ? <Options ref={optionsRef} chosenBasket={chosenBasket as Basket} chosenBasketAttributes={chosenBasketAttributes} setChosenBasketAttributes={setChosenBasketAttributes} />
                      : <Redirect to="/baskets" />
                    }
                  </Route>
                  <Route path="/cashier">
                    {chosenBasket
                      ? <Cashier
                        ref={cashierRef} history={history}
                        chosenBasket={chosenBasket as Basket} chosenBasketAttributes={chosenBasketAttributes}
                        currentVariation={currentVariation} getCurrentVariation={getCurrentVariation}
                        accessories={accessories} chosenAccessories={chosenAccessories} setChosenAccessories={setChosenAccessories}
                        shippingMethods={shippingMethods} chosenShippingMethod={chosenShippingMethod as ShippingMethod} setChosenShippingMethod={setChosenShippingMethod}
                        currentCustomer={currentCustomer} setCurrentCustomer={setCurrentCustomer}
                        createdOrder={createdOrder} createOrder={createOrder} />
                      : <Redirect to="/baskets" />
                    }
                  </Route>
                  <Route path="/">
                    <Home ref={homeRef} history={history} />
                  </Route>
                </Switch>
                :
                <Loading ref={loadingRef} hasBasket={!!chosenBasket} selectedLang={selectedLang} />
            :
            <Offline selectedLang={selectedLang} />
          }
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
