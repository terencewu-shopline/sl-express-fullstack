import {
  Routes,
  Route,
} from "react-router-dom";
import MainLayout from './layouts/main';
import NewsListPage from './pages/news-list';
import NewsNewPage from './pages/news-new';
import NewsShowPage from './pages/news-show';
import Error401Page from './pages/error-401';
import { usePageTitle } from "./utils/page-title";
import { useEffect } from "react";

export const App = () => {
  const { title } = usePageTitle()

  useEffect(() => {
    console.log(title)
  }, [title])

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<NewsListPage />} />
        <Route path="/news/new" element={<NewsNewPage />} />
        <Route path="/news/:id" element={<NewsShowPage />} />
        <Route path="/401" element={<Error401Page />} />
      </Route>
    </Routes>
  )
}
