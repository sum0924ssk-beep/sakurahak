// components/ChatRoom.jsx (修正推奨)

import React, { useEffect, useRef } from 'react';

// propsのmessagesにデフォルト値として空の配列 `[]` を設定
const ChatRoom = ({ messages = [] }) => { 
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // messagesが空の配列の場合の表示
  if (messages.length === 0) {
    return (
      <div className="chat-room">
        <p className="no-messages">通知はまだありません。</p>
      </div>
    );
  }

  return (
    <div className="chat-room">
      {messages.map((msg) => (
        <div
          key={msg.id}
          // me以外のuser（system, infoなど）は全部other-messageのスタイルになる
          className={`message-container ${msg.user === 'me' ? 'my-message' : 'other-message'}`}
        >
          <div className="message-bubble">
            <p className="message-text">{msg.text}</p>
          </div>
          <span className="message-timestamp">{msg.timestamp}</span>
        </div>
      ))}
      <div ref={endOfMessagesRef} />
    </div>
  );
};

export default ChatRoom;