import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css'
import 'bootstrap-social/bootstrap-social.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import * as serviceWorker from './serviceWorker';
import { runWithAdal } from 'react-adal';
import { authContext } from './AuthConfig';


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

 const DO_NOT_LOGIN = false;
 runWithAdal(authContext, () => {
    ReactDOM.render(<App />, document.getElementById('root'));
      //Hot Module Replacement API
    if (module.hot) {
        module.hot.accept('./App.js', () => {
            const NextApp = require('./App').default;
            ReactDOM.render(<NextApp />, document.getElementById('root'));
        });
    }

 }, DO_NOT_LOGIN);




//ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.unregister();