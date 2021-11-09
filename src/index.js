import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {Auth} from "aws-amplify";
import config from './aws-exports'
import { ToastProvider } from 'react-toast-notifications';

Auth.configure(config);

ReactDOM.render(
  <ToastProvider>
    <App />
   </ToastProvider>
    ,
  document.getElementById('root')
);