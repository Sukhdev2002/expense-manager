/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react';
import Navigation from '../navigation';
import Dashboard from '../dashboard';
import Expense from '../expense';
import Investment from '../investment';
import Savings from '../savings';
import Profile from '../profile';

function Home() {
  const [selectedMenu, setSelectedMenu] = useState('home');

  const getBody = () => {
    switch (selectedMenu) {
      case 'home':
        return <Dashboard />;
      case 'expense':
        return <Expense />;
      case 'investment':
        return <Investment />;
      case 'savings':
        return <Savings />;
      case 'profile':
        return <Profile />;
    }
  }

  return (
    <div>
      <Navigation onMenuClick={setSelectedMenu} selected={selectedMenu} />
      <div>
        {getBody()}

      </div>
    </div>
  );
}

export default Home;
