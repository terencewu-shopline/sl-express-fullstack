import { useRequest } from "ahooks";
import { createContext, useContext, useState, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { Loading } from "../components/Loading";
import { appBridge } from "../lib/appBridge";
import { fetch } from "./fetch";
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const { loading } = useRequest(fetch(`/api/users/me`), {
    onSuccess: async ({ payload, status }) => {
      if (status == 401) {
        const client = await appBridge.getClient()
        client.oauth()
        return
      }

      setUser(payload)
    }
  })

  const value = useMemo(
    () => ({
      user,
      loading,
    }),
    [user, loading]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const ProtectedLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading />
  }

  if (!user) {
    return <Navigate to="/401" />;
  }

  return <Outlet />;
};
