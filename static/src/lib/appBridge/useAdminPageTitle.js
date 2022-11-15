import { useEffect } from "react";
import { usePageTitle } from "../../utils/page-title";

export const useAdminPageTitle = (client) => {
  const { title } = usePageTitle();

  useEffect(() => {
    if (client) {
      client.changePageTitle(title);
    }
  }, [client, title]);
}