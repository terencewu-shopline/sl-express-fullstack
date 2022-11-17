import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export const useAdminDeepLink = (client) => {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (client) {
      client.getCurrentUrl().then((url) => {
        const route = new URL(url).searchParams.get('route')
        if (route != `${location.pathname}${location.search}${location.hash}`) {
          navigate(route, { replace: true })
        }
      })
    }
  }, [client])

  useEffect(() => {
    if (client) {
      client.notifyAppRouteChanged(`${location.pathname}${location.search}${location.hash}`)
    }
  }, [client, location])
}