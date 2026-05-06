# Telegram News Summary App

Telegramで送信した記事URLを自動で収集し、AI（Gemini）を用いて要約・カテゴリ分類を行うデスクトップアプリケーション（Electron + React）です。
日々の情報収集を効率化し、スマートに管理するためのパーソナルダッシュボードとして機能します。

## 主な機能

- **Telegram連携**: 連携したBot（またはBotが参加しているチャンネル・グループ）に投稿されたURL付きメッセージを自動で検知・取得します。
- **自動スクレイピング**: 取得したURL先のページにアクセスし、広告やヘッダー等の不要な要素を省いた「純粋な記事本文」のみを抽出します。
- **AI要約（Gemini 1.5/2.5 Flash）**: 抽出した長文記事をGoogleのAIモデルが解析し、「3行の箇条書き要約」と「最適なカテゴリ分類」を瞬時に生成します。
- **モダンなUI**: 取得・要約した記事は、ReactとTailwind CSSで作られた美しいカード型ダッシュボードで一覧表示されます。カテゴリごとの自動色分け機能も搭載しています。
- **オフライン保存**: 取得したデータはローカルのSQLiteデータベースに保存されるため、アプリ起動時にすぐに過去の記事を確認できます。

## 技術スタック

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend (Electron Main)**: Node.js, SQLite (sqlite3), Telegraf (Telegram Bot API)
- **Scraping**: @mozilla/readability, jsdom
- **AI**: @google/generative-ai (Gemini API)

## インストールとセットアップ手順

### 1. リポジトリのクローンとパッケージインストール
\`\`\`bash
# 依存関係のインストール
npm install
\`\`\`

### 2. 環境変数の設定
プロジェクトのルートディレクトリに \`.env\` ファイルを作成し、以下の情報を記述してください。
（\`.env.example\` をコピーして利用できます）

\`\`\`env
# TelegramのBotFatherから取得したBotトークン
TELEGRAM_BOT_TOKEN=your_bot_token_here

# Google AI Studio等で取得したGemini APIキー
GEMINI_API_KEY=your_gemini_api_key_here
\`\`\`

### 3. アプリケーションの起動（開発モード）
\`\`\`bash
# 開発サーバーの立ち上げ（自動でアプリ画面が開きます）
npm run dev
\`\`\`

### 4. ビルド（アプリのパッケージ化）
\`\`\`bash
# 実行可能なアプリケーション形式にビルドする場合
npm run build
\`\`\`

## 使い方

1. **URLの送信**: Telegramアプリを開き、連携したBotのチャット（またはグループ）に読みたい記事のURLを送信します。
2. **同期の実行**: 本アプリを立ち上げ、画面左下の「新着記事を同期」ボタンをクリックします。
3. **結果の確認**: 裏側で自動的に【URL取得 → 本文抽出 → AI要約 → DB保存】が行われ、画面上に要約されたカードが表示されます。

## ライセンス

ISC License
