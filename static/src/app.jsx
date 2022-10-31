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
import { AppBridgeContext } from "./lib/appBridge";
import { Loading } from "./components/Loading";
import { useContext } from "react";
import { useAdminDeepLink } from "./lib/appBridge/useAdminDeepLink";
import { useAdminLanguage } from "./lib/appBridge/useAdminLanguage";
import { useAdminPageTitle } from "./lib/appBridge/useAdminPageTitle";

export const App = () => {
  const { client, loading } = useContext(AppBridgeContext);

  useAdminDeepLink(client);
  useAdminLanguage(client);
  useAdminPageTitle(client);

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
