import { useMemo } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Menu as AMenu } from 'antd';

export const Menu = ({ links }) => {
  const location = useLocation()

  const items = useMemo(() => links.map(link => ({
    label: (
      <Link to={link.path}>
        {link.label}
      </Link>
    ),
    key: link.path,
  })), [links]);

  const activeLinks = useMemo(() => {
    return links.filter(link => link.exact ? link.path == location.pathname : location.pathname.startsWith(link.path)).map(link => link.path)
  }, [links, location.pathname])

  return (
    <AMenu theme="dark" selectedKeys={activeLinks} mode="horizontal" items={items} />
  )
}
