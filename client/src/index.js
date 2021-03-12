import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

import Navbar from './components/Navbar/Navbar';
import App from './App';

ReactDOM.render(
    <BrowserRouter>
        <Navbar />
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);