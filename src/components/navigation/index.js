import React from 'react';
import { Menu } from 'antd';
import { MenuProps } from 'antd';
import {
  MoneyCollectFilled,
  HomeFilled,
  DiffFilled,
  FundFilled,
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';

function Navigation(props) {
  const { onMenuClick, selected } = props;

  const getItems = () => {
    const items = [];
    items.push({ label: 'Home', icon: <HomeFilled />, key: 'home' });
    items.push({ label: 'Expense', icon: <DiffFilled />, key: 'expense' });
    items.push({ label: 'Investment', icon: <FundFilled />, key: 'investment' });
    items.push({ label: 'Savings', icon: <MoneyCollectFilled />, key: 'savings' });

    items.push({ label: 'Category', icon: <UserOutlined />, key: 'category' });
    items.push({ label: 'Profile', icon: <UserOutlined />, key: 'profile' });
    return items;
  };

  return (
    <div>
      <Menu
        style={{ width: '100%' }}
        defaultSelectedKeys={[selected || 'home']}
        mode={'horizontal'}
        theme={'light'}
        items={getItems()}
        onClick={(e) => onMenuClick(e.key)} />
    </div>
  )
}

export default Navigation;