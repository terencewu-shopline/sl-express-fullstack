import { AppBridge } from "@shopline/app-bridge-js";
import { useTranslation } from "react-i18next";
import { useRequest } from "ahooks";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const client = AppBridge.init({
  clientId: import.meta.env.VITE_APP_BRIDGE_CLIENT_ID,
  authUrl: import.meta.env.VITE_APP_BRIDGE_AUTH_URL,
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

export const useAdminDeepLink = () => {
  const { client, loading } = useAppBridge()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (client) {
      client.getCurrentUrl().then((url) => {
        const path = new URL(url).searchParams.get('path')
        if (path != null) {
          navigate(path)
        }
      })
    }
  }, [client])

  useEffect(() => {
    if (client) {
      client.routeChange(location.pathname, location.search)
    }
  }, [client, location])

  return {
    loading,
  }
}

export const useAdminLanguage = () => {
  const { client, loading } = useAppBridge()
  const { i18n } = useTranslation()

  useEffect(() => {
    if (client) {
      client.getLanguage().then(lang => i18n.changeLanguage(lang))
      client.subscribe('shopline:language-changed', ({ language }) => {
        i18n.changeLanguage(language)
      })
    }
  }, [client])

  return {
    loading,
  }
}

export const useAdminFeatures = () => {
  const features = [
    useAdminDeepLink(),
    useAdminLanguage(),
  ]

  return {
    loading: features.some(feature => feature.loading),
  }
}
