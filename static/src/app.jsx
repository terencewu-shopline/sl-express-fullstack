import {
  Routes,
  Route,
} from "react-router-dom";
import { ProtectedLayout } from './utils/auth';
import MainLayout from './layouts/main';
import NewsListPage from './pages/news-list';
import NewsNewPage from './pages/news-new';
import NewsShowPage from './pages/news-show';
import Error401Page from './pages/error-401';
import { useAdminFeatures } from "./lib/appBridge";
import { Loading } from "./components/Loading";

export const App = () => {
  const { loading } = useAdminFeatures()

  if (loading) {
    return <Loading />
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route element={<ProtectedLayout />}>
          <Route index element={<NewsListPage />} />
          <Route path="/news/new" element={<NewsNewPage />} />
          <Route path="/news/:id" element={<NewsShowPage />} />
        </Route>
        <Route path="/401" element={<Error401Page />} />
      </Route>
    </Routes>
  )
}
