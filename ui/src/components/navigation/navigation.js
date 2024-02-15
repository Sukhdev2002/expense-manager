import React from 'react';
import { Menu } from 'antd';
import { MenuProps } from 'antd';
import {
  MoneyCollectFilled,
    HomeFilled,
    DiffFilled,
    FundFilled,
  UserOutlined
} from '@ant-design/icons'; 

function Navigation(props) {

    const { onMenuClick, selected } = props;

    const getItem = (label, key, icon, children) => ({ label, key, icon, children });

    const items = [
        getItem('Home', 'home', <HomeFilled />),
        getItem('Expense', 'expense', <DiffFilled />),
        getItem('Investement', 'investment', <FundFilled />),
        getItem('Savings', 'savings', <MoneyCollectFilled />),
        getItem('Profile', 'profile', <UserOutlined />),
    ];


    return (
        <div>
            <Menu
                style={{ width: '100%'}}
                defaultSelectedKeys={[selected || '1']}
                mode={'horizontal'}
                theme={'light'}
                items={items} 
                onClick={(e) => onMenuClick(e.key)}/>
        </div>
  )
}

export default Navigation;