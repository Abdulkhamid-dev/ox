import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography, message } from 'antd';
import { useState } from 'react';
import api from '@/utils/axios';
import { setToken } from '@/utils';

const { Title } = Typography;

interface LoginFormValues {
  username: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: LoginFormValues) => {
    setLoading(true);
    const body = new URLSearchParams();
    body.append('_username', values.username);
    body.append('_password', values.password);
    body.append('_subdomain', 'toko');

    try {
      const response = await api.post('/security/auth_check', body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      setToken(response.data.token);
      message.success('Successfully logged in!');
      navigate('/products');
    } catch (error) {
      console.error(error);
      message.error('Password or login wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto' }}>
      <Title level={2} style={{ textAlign: 'center' }}>
        Log in
      </Title>
      <Form layout="vertical" onFinish={handleLogin}>
        <Form.Item
          label="Login"
          name="username"
          rules={[{ required: true, message: 'Login required' }]}
        >
          <Input placeholder="Login" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Password required' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
