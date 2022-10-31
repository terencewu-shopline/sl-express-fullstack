import { useEffect } from "react";

export const useAdminRouteChange = ({ client, onRouteChange }) => {
  const onModalOk = () => {
    client?.routeChangeContinue();
  }

  const onModalCancel = () => {
    client?.routeChangeCancel();
  }
  
  useEffect(() => {
    return client?.onRouteChange(onRouteChange);
  }, [client, onRouteChange]);

  return {
    client,
    onModalOk,
    onModalCancel,
  }
}