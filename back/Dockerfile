# 1. ベースイメージの指定
FROM python:3.11-slim

# 2. ワークディレクトリの設定（コンテナ内部の作業場所）
WORKDIR /app

# 3. 依存関係のコピーとインストール
# requirements.txtがmessage/にあるため、パスを修正
COPY message/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. アプリケーションコードのコピー
# messageフォルダ全体をコンテナの/appにコピー
# これにより、コンテナ内で 'message.app.main:app' のパスが有効になる
COPY message /app/message

# 5. アプリケーションがリッスンするポートを公開
EXPOSE 8000

# 6. サーバー起動コマンドの定義
# ローカルで動作確認した正しいパスを使ってサーバーを起動
CMD ["uvicorn", "message.app.main:app", "--host", "0.0.0.0", "--port", "8000"]