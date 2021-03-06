import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './components';
import '@fontsource/roboto';

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.querySelector('#app'),
);