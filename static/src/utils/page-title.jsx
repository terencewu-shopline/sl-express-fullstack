import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const PageTitleContext = createContext();

export const PageTitleProvider = ({ children }) => {
  const defaultValue = useMemo(() => {
    return document.title;
  }, []);

  const [title, setTitle] = useState(defaultValue);

  useEffect(() => {
    if (title != document.title) {
      document.title = title;
    }
  }, [title]);

  const resetTitle = useCallback(() => {
    setTitle(defaultValue);

  }, [setTitle]);

  const value = useMemo(() => (
    {
      title,
      setTitle,
      resetTitle
    }
  ), [title, setTitle, resetTitle]);

  return (
    <PageTitleContext.Provider value={value}>
      {children}
    </PageTitleContext.Provider>
  )
}

export const usePageTitle = (title) => {
  const ctx = useContext(PageTitleContext);
  
  useEffect(() => {
    if (title) {
      ctx.setTitle(title);
    }

    return () => {
      ctx.resetTitle();
    }

  }, [title, ctx.title, ctx.resetTitle]);

  return ctx;
}