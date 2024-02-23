/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import Navigation from './navigation/navigation';
function Home() {
  const [selectedMenu, setSelectedMenu] = useState('home');

  return (
    <div>
      <Navigation onMenuClick={setSelectedMenu} selected={selectedMenu} />
      <div>

      </div>
    </div>
  );
}

export default Home;
