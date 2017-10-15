 /**
 * @desc A declarative, efficient, and flexible JavaScript library for building user interfaces.
 * @version 16.0.0
 * @external React
 * @see {@link https://github.com/apollographql/graphql-tools react}
 */
import React from 'react';
 /**
 * @desc This package serves as the entry point of the DOM-related rendering paths. It is intended to be paired with the isomorphic React, which will be shipped as react to npm.
 * @version 16.0.0
 * @external ReactDOM
 * @see {@link https://github.com/apollographql/graphql-tools react-dom}
 */
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
