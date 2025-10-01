# back/message/app/main.py

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from typing import List
import redis.asyncio as redis
import uvicorn
import asyncio

app = FastAPI()

# ----------------------------------------------------
# 1. 接続管理クラス（ConnectionManager）は削除またはコメントアウト
# ----------------------------------------------------
# Redisクライアントの定義
# ホスト名に Docker Compose で定義したサービス名 'redis' を指定
redis_client = redis.Redis(host='redis', port=6379, db=0)

# Pub/Subのためのチャネル名を定義
CHANNEL_NAME = "chat_channel"

@app.on_event("startup")
async def startup_event():
    # Redis接続確認
    try:
        await redis_client.ping()
        print("Redis接続確認OK")
    except Exception as e:
        print(f"Redis接続エラー: {e}")

# ----------------------------------------------------
# 2. Redisからのメッセージを受信し、クライアントに転送するリスナー関数
# ----------------------------------------------------
async def redis_listener(websocket: WebSocket, pubsub):
    # Pub/Subチャネルを非同期で監視し続ける
    async for message in pubsub.listen():
        # 'message'タイプのメッセージのみ処理
        if message['type'] == 'message':
            # バイト文字列をデコード
            decoded_message = message['data'].decode('utf-8')
            try:
                # WebSocketを通じてクライアントにメッセージを転送
                await websocket.send_text(decoded_message)
            except WebSocketDisconnect:
                # クライアントが切断したら、このリスナーを停止
                break

@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: int):
    await websocket.accept()
    print(f"User #{client_id} が接続しました")
    
    # 3. PubSubリスナーの準備
    pubsub = redis_client.pubsub()
    await pubsub.subscribe(CHANNEL_NAME) # チャンネルを購読開始
    
    # クライアントへのメッセージ受信タスクを非同期で開始
    listener_task = asyncio.create_task(redis_listener(websocket, pubsub))

    # 接続が成功したことを通知（ブロードキャスト）
    await redis_client.publish(CHANNEL_NAME, f"User #{client_id} が接続しました")
    
    try:
        while True:
            # 1. クライアントからメッセージを受信
            data = await websocket.receive_text()
            message = f"User #{client_id}: {data}"
            
            # 2. リアルタイム通信 (Redis Pub/Subへメッセージを公開)
            # メッセージをサーバーメモリに送る代わりに、Redisに送る
            await redis_client.publish(CHANNEL_NAME, message)

            # 3. DBへの保存処理 (並列実行を想定 - 担当外の連携部分)
            asyncio.create_task(save_message_to_db(client_id, data))
            
    except WebSocketDisconnect:
        print(f"User #{client_id} が切断しました")
    finally:
        # 切断時、リスナータスクのキャンセルと購読解除
        listener_task.cancel()
        await pubsub.unsubscribe(CHANNEL_NAME)
        # 接続が閉じられたことを他のユーザーに通知
        await redis_client.publish(CHANNEL_NAME, f"User #{client_id} が退室しました")
        
# DB保存のモック関数 (変更なし)
async def save_message_to_db(user_id, content):
    # DB操作（担当外）の遅延をシミュレート
    await asyncio.sleep(0.1) 
    print(f"[履歴保存モック] ユーザー{user_id}のメッセージを保存: {content}")

if __name__ == "__main__":
    # ローカル実行時はRedisがないため動作しませんが、Docker環境で利用します
    uvicorn.run("message.app.main:app", host="0.0.0.0", port=8000, reload=True)