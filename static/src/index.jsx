import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from "react-router-dom";
import _ from "./utils/i18n";
import { AuthProvider } from './utils/auth';
import { App } from './app';
import './index.css';
import { PageTitleProvider } from './utils/page-title';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <HashRouter>
    <AuthProvider>
      <PageTitleProvider>
        <App />
      </PageTitleProvider>
    </AuthProvider>
  </HashRouter>
);
