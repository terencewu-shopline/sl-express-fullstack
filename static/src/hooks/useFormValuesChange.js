import { useCallback, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppBridgeContext } from "../lib/appBridge";
import { useAdminRouteChange } from "../lib/appBridge/useAdminRouteChange";

export const useFormValuesChange = () => {
  const { t } = useTranslation();
  const [ isDirty, setIsDirty ] = useState(false);
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  const onRouteChange = useCallback((e) => {
    if (isDirty) {
      e.preventDefault();

      setIsModalOpen(true);
    }
  }, [isDirty, t]);

  const { client } = useContext(AppBridgeContext);
  const { onModalOk, onModalCancel } = useAdminRouteChange({ client, onRouteChange });

  const continueModal = useCallback(() => {
    onModalOk();
    setIsModalOpen(false);
  }, [onModalOk, setIsModalOpen]);

  const cancelModal = useCallback(() => {
    onModalCancel();
    setIsModalOpen(false);
  }, [onModalCancel, setIsModalOpen]);

  return {
    isModalOpen,
    setIsDirty,
    continueModal,
    cancelModal,
  }
}