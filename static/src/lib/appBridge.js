import { AppBridge } from "@shopline/app-bridge-js";
import { useTranslation } from "react-i18next";
import { useRequest } from "ahooks";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

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

export const useAdminDeepLink = () => {
  const { client, loading } = useAppBridge()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (client) {
      client.getCurrentUrl().then((url) => {
        const route = new URL(url).searchParams.get('route')
        if (route != `${location.pathname}${location.search}${location.hash}`) {
          navigate(route)
        }
      })
    }
  }, [client])

  useEffect(() => {
    if (client) {
      client.notifyAppRouteChanged(`${location.pathname}${location.search}${location.hash}`)
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
      // return an unsubscribe function
      return client.onLanguageChanged(language => {
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
