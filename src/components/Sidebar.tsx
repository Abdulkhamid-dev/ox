import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  SearchOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const menuItems = [
    {
      key: '/products',
      icon: <AppstoreOutlined />,
      label: <NavLink to="/products">Products</NavLink>,
    },
    {
      key: '/search',
      icon: <SearchOutlined />,
      label: <NavLink to="/search">Search</NavLink>,
    },
  ];

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        borderRight: '1px solid #f0f0f0',
      }}
    >
      <div
        style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          fontSize: 18,
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        Admin Panel
      </div>

      <div style={{ flex: 1, overflow: 'auto' }}>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ borderRight: 0 }}
        />
      </div>

      <div style={{ padding: 16, borderTop: '1px solid #f0f0f0' }}>
        <Button
          icon={<LogoutOutlined />}
          danger
          block
          onClick={handleLogout}
        >
          Log out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
