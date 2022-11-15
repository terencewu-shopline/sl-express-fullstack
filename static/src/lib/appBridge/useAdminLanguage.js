import { useEffect } from "react"
import { useTranslation } from "react-i18next"

export const useAdminLanguage = (client) => {
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
}