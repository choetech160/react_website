// Basic import
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import asyncComponent from './components/AsyncComponent';
import {withAuthenticator} from 'aws-amplify-react';
import React, { useState, useEffect } from 'react';


// Public import
import Navbar from './components/Navbar/Navbar';
import Home from './components/pages/HomePage/Home';
import Services from './components/pages/Services/Services';
import Footer from './components/pages/Footer/Footer';
import AboutUs from './components/pages/About Us/AboutUs';
import UnderConstruction from './components/pages/UnderConstruction/UnderConstruction';
// import SignUp from './components/pages/SignUp/SignUp';
import EmailRedirector from './components/pages/EmailRedirector/EmailRedirector';
import ScrollToTop from './ScrollToTop';
import { createBrowserHistory } from "history";
// ---------------- MOVE TO PROTECTED ----------------------------------
import VirtualCard from './components/pages/VirtualCard/VirtualCard';
import MainDashboard from './components/pages/Dashboard/MainDashboard';
import WelcomeModal from './components/WelcomeModal/WelcomeModal';
// import Dashboard from './components/pages/Dashboard/Dashboard';
// import Payments from './components/pages/Dashboard/Payments/Payment';
// import MyAccount from './components/pages/Dashboard/MyAccount/MyAccount'
import FAQ from './components/pages/FAQ/FAQ';
import HowItWorks from './components/pages/HowItWorks/HowItWorks';
import TermsOfServices from './components/pages/TermsOfServices/TermsOfServices';
// ---------------- MOVE TO PROTECTED ----------------------------------
import Auth from '@aws-amplify/auth';
import { Hub } from 'aws-amplify';
import CitrusLogo from './components/logo/citrusLogo'
import { useToasts } from 'react-toast-notifications';

const history = createBrowserHistory();
function App() {
    
    const [user, setUser] = useState();
    const [lang, setLang] = useState('EN');
    const { addToast } = useToasts();
    const messageChangeHandler = (event) => { // Needed to make the sending text appears when user's is writting
      console.log("messageChangeHandler");
      console.log(event);
      setLang(event);
    }
    
    const [modalState, setModalState] = useState();
    const welcomeModalChange = (event) => {
      console.log("welcomeModalChange : ", event);
      setModalState(event);
    }

    useEffect(() => {
      let visited = localStorage['cp-alreadyvisited'];
      if (visited){
        setModalState(false);
      }
      else{
        setModalState(true);
      }
    })


    console.log("[APPJS] modal state: ", modalState)

    useEffect(() => {
      let updateUser = async() => {
        console.log("hub event")
        try {
          let user = await Auth.currentAuthenticatedUser();
          setUser({user});
        } catch (e) {
          setUser(null);
        }
      }
      Hub.listen('auth', res => {
        console.warn("Auth event: ", res)
        let errorMsg = res.payload.data.message ? res.payload.data.message : '';
        if (res.payload.event === 'signUp_failure'){
          addToast(errorMsg, { appearance: 'warning', autoDismiss: true})
        }
        else if (res.payload.event === 'signUp'){
          console.log('SignUp')
          if (res.payload.message.includes('has signed up successfully')){
            console.log('successful signup')
            addToast('We sent you a verification email',{ appearance:'success', autoDismiss:true})
            updateUser()
          }

        }
        else{
          updateUser();
        }
          
      }) // listen for login/signup events
      // updateUser() // check manually the first time because we won't get a Hub event
      
      return () => Hub.remove('auth', updateUser) // cleanup
    }, []);
  return (
    // <div className='backgroundimage'>
    // <ToastProvider>
    <Router history={history}>
      <Navbar user={user} change={messageChangeHandler} />
      <WelcomeModal status={modalState} change={welcomeModalChange}/>
      <ScrollToTop>
      <Switch>
        <Route path='/' exact component={(props) => <Home lang={lang} {...props} />} />
        <Route path='/Services' component={(props) => <Services lang={lang} {...props} />}/>
        <Route path='/AboutUs' component={(props) => <AboutUs lang={lang} {...props} />}/>
        <Route path='/Dashboard' component={(props) => <MainDashboard lang={lang} {...props} />} />
        <Route path='/vcc' component={(props) => <UnderConstruction lang={lang} {...props} /> }/>  {/* // VirtualCard */}

        <Route path='/EmailRedirector' component={(props) => <EmailRedirector lang={lang} {...props} />} />
        <Route path='/FAQ' component={(props) => <FAQ lang={lang} {...props} />} />
        <Route path='/LOGO' component={(props) => <CitrusLogo lang={lang} {...props} />} />
        <Route path='/HowItWorks' component={(props) => <HowItWorks lang={lang} {...props} />} />
        <Route path='/ToS' component={(props) => <TermsOfServices lang={lang} {...props} />} />
      </Switch>
      </ScrollToTop>
      <Footer lang={lang}/>
    </Router>
    
    //* </ToastProvider> */}
    // </div>


  );
}

export default App;
