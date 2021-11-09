import React from 'react'
import { Route, BrowserRouter as Router, Switch, useRouteMatch, useHistory} from 'react-router-dom';
import asyncComponent from '../../AsyncComponent';
// import Dashboard from './Dashboard';
import Payments from './Payments/Payment';
import EmailDashboard from './EmailDashboard/EmailDashboard';

const Dashboard = asyncComponent(() => import('./Dashboard'));


function MainDashboard(props) {
  let { path, url } = useRouteMatch();

  console.log("MainDashboard props: ", props)
  const history = useHistory();
  let lang = props.lang;

  const changePath = (event) => {
    console.log("MAINDASHBOARD - PATHCHANGE : ", event);
    history.push(event);
  }


  return (
      <Switch>
        <Route exact path='/Dashboard' component={(props) => <Dashboard lang={lang} changePath={changePath} {...props} />} />

        <Route path={`${path}/payments`} component={(props) => <Payments lang={lang} {...props} />} />
        
        <Route path={`${path}/EmailDashboard`} component={(props) =>    <EmailDashboard lang={lang} {...props} />} />

      </Switch>
  )
}

export default MainDashboard
