import React, {useEffect, useState} from 'react';
import { Menu } from 'antd';
import { MenuProps } from 'antd';
import {
  MoneyCollectFilled,
    HomeFilled,
    DiffFilled,
    FundFilled,
  UserOutlined
} from '@ant-design/icons'; 
import { getCategories } from '../../services/http-service';
import { getUserId } from '../../services/data-service';
import forEach from 'lodash/forEach';

function Navigation(props) {

  // const [categories, setCategories] = useState([]);
  const { onMenuClick, selected } = props;

  // const getMenuObject = (list) => {
  //   const items = []
  //   forEach(list, (category, idx) => {
  //     const { name, subcategories, icon } = category;
  //     items.push(
  //       {
  //         label: name,
  //         key: `${name}_${idx}`,
  //         icon: icon
  //           ? <span dangerouslySetInnerHTML={icon} />
  //           : <CopyFilled />,
  //         children: getMenuObject(subcategories)
  //       }
  //     )
  //   });
  //   return items;
  // }

  const getItems = () => {
    // const items = getMenuObject(categories);
    const items = [];
    items.push({ label: 'Home', icon: <HomeFilled />, key: 'home' });
    items.push({ label: 'Expense', icon: <DiffFilled />, key: 'expense' });
    items.push({ label: 'Investment', icon: <FundFilled />, key: 'investment' });
    items.push({ label: 'Savings', icon: <MoneyCollectFilled />, key: 'savings' });
    items.push({ label: 'Profile', icon: <UserOutlined />, key: 'profile' });
    return items;
  }

    
  
  // useEffect(() => {
  //   const userId = getUserId();
  //   getCategories('/api/category')
  //     .then((res) => {
  //       if (res.data) {
  //         setCategories(res.data)  
  //       }
  //     }).catch((err) => console.log(err));
  // }, []);


  return (
      <div>
          <Menu
              style={{ width: '100%'}}
              defaultSelectedKeys={[selected || 'home']}
              mode={'horizontal'}
              theme={'light'}
              items={getItems()} 
              onClick={(e) => onMenuClick(e.key)}/>
      </div>
  )
}

export default Navigation;