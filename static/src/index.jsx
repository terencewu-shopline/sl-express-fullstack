import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";
import MainLayout from './layouts/main';
import HomePage from './pages/news-list';
import NewsShowPage from './pages/news-show';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <HashRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/news/:id" element={<NewsShowPage />} />
        </Route>
      </Routes>
  </HashRouter>
);
