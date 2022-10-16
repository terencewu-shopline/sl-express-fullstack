import { useMemo } from "react"
import { Menu as AMenu, Dropdown as ADropdown, Button as AButton } from 'antd';
import { GlobalOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next"

export const LanguageSwitch = ({ languages = [] }) => {
  const { i18n } = useTranslation()

  const menu = useMemo(() => (
    <AMenu
      items={languages.map(lang => ({
        key: lang.key,
        label: lang.label,
        onClick: () => i18n.changeLanguage(lang.key),
      }))}
    />
  ), [languages])

  return (
    <ADropdown overlay={menu} placement="bottomRight" arrow>
      <AButton type="link">
        <GlobalOutlined style={{ color: '#fff'}} />
      </AButton>
    </ADropdown>
  )
}
