import { Outlet } from "react-router-dom";
import { Row, Col, Layout } from 'antd';

import { Menu } from "../utils/menu";
import { LanguageSwitch } from "../components/LanguageSwitch";
const { Header, Content, Footer } = Layout;

const links = [
  {
    path: '/',
    label: 'general.home',
    exact: true,
  },
]

const MainLayout = () => {
  return (
    <Layout>
      <Header>
        <Row>
          <Col flex="1 1 0%">
            <Menu links={links} />
          </Col>
          <Col>
            <LanguageSwitch languages={[
              { key: 'en', label: 'EN' },
              { key: 'zh-hant', label: '繁中' },
            ]} />
          </Col>
        </Row>
      </Header>
      <Content className="main-layout">
        <Outlet />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        SL Express Fullstack ©2022
      </Footer>
    </Layout>
  )
}

export default MainLayout;
