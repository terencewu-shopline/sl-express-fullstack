import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from "react-router-dom";
import _ from "./utils/i18n";
import { App } from './app';
import { PageTitleProvider } from './utils/page-title';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <HashRouter>
    <PageTitleProvider>
      <App />
    </PageTitleProvider>
  </HashRouter>
);
