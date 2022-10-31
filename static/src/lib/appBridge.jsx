import { AppBridge } from "@shopline/app-bridge-js";
import { useRequest } from "ahooks";
import { createContext } from "react";

const client = AppBridge.init({
  clientId: window.__PRELOADED_STATE__.client_id,
  authUrl: `${window.location.origin}/oauth`,
})

export const appBridge = {
  getClient: async () => {
    return client
  }
}

export const useAppBridge = () => {
  const { data: client, loading } = useRequest(appBridge.getClient)
  return {
    client,
    loading,
  }
}

export const AppBridgeContext = createContext();

export const AppBridgeProvider = ({ children }) => {
  const { client, loading } = useAppBridge();

  return (
    <AppBridgeContext.Provider value={{ client, loading }}>
      { children }
    </AppBridgeContext.Provider>
  )
}
