import React from 'react';
import ReactDOM from 'react-dom/client';
import './UIElements/index.css';
import App from '../src/App';
import { BrowserRouter } from 'react-router-dom';
import Store from './Services/SnackBar/SnackBarStoreContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Store>
      <App />
    </Store>
  </BrowserRouter>
);
