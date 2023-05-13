import React, { useState } from 'react';
import { TodoList } from './TodoList';
import ChartGraph from "./ChartGraph"




function App() {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  }

  return (
    <div className="App">
      <nav>
        <ul>
          <li className={activeTab === 'home' ? 'active' : ''} onClick={() => handleTabClick('home')}>
            Contact
          </li>
          <li className={activeTab === 'chat' ? 'active' : ''} onClick={() => handleTabClick('chat')}>
            Charts & Map
          </li>
        </ul>
      </nav>
      <div className="content">
        
        {activeTab === 'home' && <TodoList />}
        {activeTab === 'chat' && <ChartGraph />}
      </div>
    </div>
  );
}


export default App;
