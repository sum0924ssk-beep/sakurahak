import React, { useState } from 'react'; // useStateをインポート
import ChatRoom from './components/ChatRoom';
import './App.css';

function App() {
  // 通知メッセージのダミーデータをuseStateで管理
  const [messages, setMessages] = useState([
    { id: 1, text: '🎉 新しいアップデートがリリースされました！', user: 'system', timestamp: '18:00' },
    { id: 2, text: '🗓️ 明日の10:00からメンテナンスが予定されています。', user: 'system', timestamp: '17:30' },
    { id: 3, text: '💰 期間限定セールの情報をお見逃しなく！', user: 'info', timestamp: '15:00' },
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