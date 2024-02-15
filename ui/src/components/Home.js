import React, {useState} from 'react';
import Navigation from './navigation/navigation';

function Home() {

  const [selectedMenu, setSelectedMenu] = useState('home');

  return (
    <div>
      <Navigation onMenuClick={setSelectedMenu} selected={selectedMenu} />
      <div style={{padding: '24px'}}>
        {selectedMenu}
      </div>
    </div>
  );
}

export default Home;
