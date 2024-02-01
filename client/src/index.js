import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Context from './Components/ContextProvider/Context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context>
    {/* <React.StrictMode> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    {/* </React.StrictMode> */}
  </Context>

);

reportWebVitals();
