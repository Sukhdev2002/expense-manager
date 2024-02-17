/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import Navigation from './navigation/navigation';
import  Header from './Header';
function Home() {
  const [selectedMenu, setSelectedMenu] = useState('home');

  return (
    <div>
      <Navigation onMenuClick={setSelectedMenu} selected={selectedMenu} />
      <div>
      <Header/>
      </div>
    </div>
  );
}

export default Home;
