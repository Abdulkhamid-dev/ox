import Sidebar from '@/components/Sidebar';
import { Layout } from 'antd';
import type { ReactNode } from 'react';

const { Sider, Content } = Layout;

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={220} style={{ background: '#fff', borderRight: '1px solid #f0f0f0' }}>
        <Sidebar />
      </Sider>

      <Layout>
        <Content
          style={{
            height: '100vh',
            overflowY: 'auto',
            padding: 24,
            background: '#fff',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
