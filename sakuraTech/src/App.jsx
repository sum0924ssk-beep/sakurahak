import React, { useState } from 'react'; // useStateをインポート
import ChatRoom from './components/ChatRoom';
import './App.css';

function App() {
  // 通知メッセージのダミーデータをuseStateで管理
  const [messages, setMessages] = useState([
    { id: 1, text: '🎉 山根恵太最強', application: 'LINE', timestamp: '18:00' },
    { id: 2, text: ' 天才', user: 'LINE', timestamp: '17:30' },
    { id: 3, text: '💰 あ', user: 'Discord', timestamp: '15:00' },
    { id: 4, text: '💰 あ', user: 'Discord', timestamp: '15:00' },
    { id: 5, text: '💰 あ', user: 'Discord', timestamp: '15:00' },
    { id: 6, text: '💰 あ', user: 'Discord', timestamp: '15:00' },
    { id: 7, text: '💰 あ', user: 'Discord', timestamp: '15:00' },
    { id: 8, text: '💰 あ', user: 'Discord', timestamp: '15:00' },
    { id: 9, text: '💰 あ', user: 'Discord', timestamp: '15:00' },
    { id: 3, text: '💰 あ', user: 'Discord', timestamp: '15:00' },
    { id: 3, text: '💰 あ', user: 'Discord', timestamp: '15:00' },
    { id: 3, text: '💰 あ', user: 'Discord', timestamp: '15:00' },
    { id: 3, text: '💰 あ', user: 'Discord', timestamp: '15:00' },
    { id: 3, text: '💰 あ', user: 'Discord', timestamp: '15:00' },
  ]);

  return (
    // App.cssのスタイルが適用されるようにclassNameを指定
    <div className="app-container">
      {/* ChatRoomにmessagesデータをpropsとして渡す */}
      <ChatRoom messages={messages} />
    </div>
  );
}

export default App;