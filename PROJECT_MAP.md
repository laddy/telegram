# PROJECT MAP

## プロジェクト概要
TelegramにメモしたURLを抽出し、AIによる要約とカテゴリ分類を行ってリスト表示するElectronデスクトップアプリ。
未読のニュースや記事を効率的に消化するためのツール。

## 技術スタック一覧
- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js (Electron Main Process)
- **Database**: SQLite (better-sqlite3)
- **AI**: Gemini API (@google/generative-ai)
- **Scraping**: @mozilla/readability, jsdom
- **Telegram**: Telegraf
- **Build Tool**: electron-vite (予定)

## ディレクトリ構造（予定）
```
telegram/
├── package.json
├── PROJECT_MAP.md          # 本ファイル
├── PROJECT_LOADMAP.md      # 開発進捗・タスク管理
├── 仕様書.md               # プロジェクト要件定義
├── src/
│   ├── main/               # Electron メインプロセス
│   │   ├── index.ts        # エントリポイント
│   │   ├── db.ts           # SQLite操作
│   │   ├── telegram.ts     # Telegram通信
│   │   ├── scraper.ts      # スクレイピング処理
│   │   └── gemini.ts       # AI要約処理
│   ├── renderer/           # Electron レンダラープロセス (React)
│   │   ├── src/
│   │   │   ├── App.tsx     # メインコンポーネント
│   │   │   ├── components/ # UIコンポーネント群
│   │   │   └── assets/     # スタイルシート・画像等
│   │   └── index.html
│   └── preload/            # Preload スクリプト (IPC通信)
│       └── index.ts
└── .env                    # 環境変数 (APIキー等、Git管理外)
```

## 主要ファイルの役割説明
- `src/main/index.ts`: アプリケーションのライフサイクル管理、IPCハンドラーの登録。
- `src/main/db.ts`: SQLiteデータベースの初期化、記事データの保存・取得。
- `src/main/telegram.ts`: Telegram Bot APIと通信し、未取得のURLを抽出する。
- `src/main/scraper.ts`: 指定されたURLにアクセスし、Readabilityで本文のみを抽出する。
- `src/main/gemini.ts`: 抽出した本文をGemini APIに送信し、要約とカテゴリ分類を行う。
- `src/renderer/src/App.tsx`: 取得した記事をリスト表示するReactのメインUI。

## 外部API・サービスとの連携一覧
- **Telegram Bot API**: ユーザーが投稿したURLを取得するため。
- **Gemini API**: 記事内容の3行要約およびカテゴリ分類を行うため。

## 未解決の技術的課題（TODO）
- [ ] プロジェクトの初期セットアップ（`electron-vite` の実行）
- [ ] Telegram Bot の作成と Token の取得
- [ ] Gemini API Key の取得
- [ ] .env による環境変数の管理設定

## 作業別クイックリファレンスセクション
- （今後、機能追加の際によく使うコマンドや参照先を追記）
