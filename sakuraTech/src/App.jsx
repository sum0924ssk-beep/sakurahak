// App.jsx (修正案)

import React, { useState } from 'react';
import ChatRoom from './components/ChatRoom';
import './App.css';

function App() {
  const [messages, setMessages] = useState([
    // ... (メッセージのデータは変更なし)
    { id: 1, text: '🎉 山根恵太最強', user: { name: '山根恵太', icon: '山' }, timestamp: '18:00'},
    { id: 2, text: ' 天才', user: { name: 'LINE Bot', icon: 'L' }, timestamp: '17:30'},
    { id: 3, text: '💰 あ', user: { name: '山根', icon: '山' }, timestamp: '15:00' },
    { id: 4, text: '💰 あ', user: { name: '佐々木', icon: '佐' }, timestamp: '15:00' },
    { id: 5, text: '💰 あ', user: { name: '山口', icon: '口' }, timestamp: '15:00' },
  ]);

  // ▼ ここから追加 ▼
  // 検索キーワードを保存するための状態
  const [searchTerm, setSearchTerm] = useState('');

  // 検索キーワードに基づいてメッセージをフィルタリング
  const filteredMessages = messages.filter((msg) => {
    const term = searchTerm.toLowerCase(); // 検索語を小文字に
    const userName = msg.user.name.toLowerCase(); // ユーザー名も小文字に

    // ユーザー名 または タイムスタンプに検索キーワードが含まれていたら表示
    return userName.includes(term) || msg.timestamp.includes(term);
  });
  // ▲ ここまで追加 ▲


  return (
    <div className="app-container">
      <header className='app-header'>
        <h1>性格診断アプリ</h1>
        
        <input
          type="text"
          placeholder="ユーザー名で検索"
          className="search-box"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      </header>
      <main className='chat-room-container'>
        {/* 表示するメッセージをフィルタリング済みのものに変更 */}
        <ChatRoom messages={filteredMessages} />
      </main>
      
    </div>
  );
}

export default App;