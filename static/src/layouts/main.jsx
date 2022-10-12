import { Outlet } from "react-router-dom";
import { Layout } from 'antd';
import { Menu } from "../utils/menu";
const { Header, Content, Footer } = Layout;

const links = [
  {
    path: '/',
    label: 'Home',
    exact: true,
  },
]

const MainLayout = () => {
  return (
    <Layout>
      <Header>
        <Menu links={links} />
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
