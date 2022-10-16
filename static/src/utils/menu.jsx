import { useMemo } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Menu as AMenu, Dropdown as ADropdown, Button as AButton } from 'antd';
import { useTranslation } from "react-i18next";

export const Menu = ({ links }) => {
  const location = useLocation()
  const { t, i18n } = useTranslation()

  const items = useMemo(() => links.map(link => ({
    label: (
      <Link to={link.path}>
        {t(link.label)}
      </Link>
    ),
    key: link.path,
  })), [links, i18n.language]);

  const activeLinks = useMemo(() => {
    return links.filter(link => link.exact ? link.path == location.pathname : location.pathname.startsWith(link.path)).map(link => link.path)
  }, [links, location.pathname])

  return (
    <AMenu theme="dark" selectedKeys={activeLinks} mode="horizontal" items={items} />
  )
}
