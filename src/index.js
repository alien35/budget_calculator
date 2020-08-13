import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase/app';
import seeds from './seeds';

firebase.initializeApp(
   {
    apiKey: "AIzaSyBPnC-bnE0qWW1hi9-7Xbuk2OChS5nTdF4",
    authDomain: "yardzen-c322c.firebaseapp.com",
    databaseURL: "https://yardzen-c322c.firebaseio.com",
    projectId: "yardzen-c322c",
    storageBucket: "yardzen-c322c.appspot.com",
    messagingSenderId: "825942882661",
    appId: "1:825942882661:web:c97879807d4a406e3e498c",
    measurementId: "G-2TJ5G5DG93"
  }
)

window.seed = seeds;


ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
