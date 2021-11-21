import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import '@synevix/react-widget/dist/esm/widget.css' 
import './index.css';
import reportWebVitals from './reportWebVitals';
import routing from './routing';

const node = document.createElement('script');
node.src = `https://www.google.com/recaptcha/api.js?render=${process.env.REACT_APP_RECAPTCHA_KEY}`;
document.body.append(node);


const TRACKING_ID = "UA-191903394-1"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

ReactDOM.render( 
  <React.StrictMode> 
    {routing}
  </React.StrictMode>,
  document.getElementById('root')
); 

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
