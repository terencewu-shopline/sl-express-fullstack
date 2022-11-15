import { useContext, useEffect } from "react";
import { AppBridgeContext } from "../appBridge";

export const useAdminRouteChange = (callback, when) => {
  const { client } = useContext(AppBridgeContext);

  useEffect(() => {
    if (!when) return;
  
    const unsubscribe = client?.onRouteChanged(callback);
  
    return () => unsubscribe();
  }, [when]);

  return {
    retryRouteChange: () => client?.retryRouteChange(),
  }
}