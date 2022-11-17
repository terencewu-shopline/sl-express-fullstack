import { useContext, useEffect } from "react";
import { AppBridgeContext } from "../appBridge";

export const useAdminRouteInterceptor = (callback, when) => {
  const { client } = useContext(AppBridgeContext);

  useEffect(() => {
    if (!when) return;
  
    const stopInterception = client?.interceptRouteChange(callback);
  
    return () => stopInterception();
  }, [when]);

  return {
    retryRouteChange: () => client?.retryRouteChange(),
  }
}
