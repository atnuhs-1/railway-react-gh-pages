import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, { QiitaArticle } from './App';

declare global {
  interface Window {
    __INITIAL_DATA__: QiitaArticle[];
  }
}

const initialData = window.__INITIAL_DATA__;

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error("Failed to find the root element")

ReactDOM.hydrateRoot(
  rootElement,
  <React.StrictMode>
    <App initialArticles={initialData} />
  </React.StrictMode>,
  
);