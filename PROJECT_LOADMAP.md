# 開発管理ノート (PROJECT_LOADMAP.md)

このファイルはアプリ開発のタスク一覧と進捗状況を管理するためのノートです。
各タスクの実行前後で必ず「ステータス」と「成果物」を最新の状態に更新してください。

## タスクリスト

### フェーズ1：プロジェクトの初期セットアップ
- [x] `electron-vite` 相当のプロジェクト雛形作成（手動構築）
  - **ステータス**: 完了
  - **成果物**: `package.json`, `tsconfig.json`, `electron.vite.config.ts`, `src/` 配下のソースコード
- [x] Tailwind CSS の導入
  - **ステータス**: 完了
  - **成果物**: `tailwind.config.js`, `postcss.config.js`, `src/renderer/src/index.css`
- [x] 必要な依存ライブラリのインストール
  - **ステータス**: 完了
  - **成果物**: `node_modules/`, `package-lock.json`

### フェーズ2：バックエンド（Mainプロセス）とデータベース構築
- [x] SQLite データベースのセットアップ (`sqlite3`)
  - **ステータス**: 完了
  - **成果物**: `src/main/db/index.ts`, `database.sqlite` (生成確認済み)
- [x] Telegram API 連携処理の実装 (`telegraf`)
  - **ステータス**: 完了
  - **成果物**: `src/main/telegram/index.ts`, `.env.example`, `.gitignore` (更新)
- [x] Webスクレイピング処理の実装 (`@mozilla/readability`, `jsdom`)
  - **ステータス**: 完了
  - **成果物**: `src/main/scraper/index.ts`
- [x] Gemini API による要約・カテゴリ分類の実装
  - **ステータス**: 完了
  - **成果物**: `src/main/ai/index.ts`, `test-ai.ts`
- [x] IPC (Inter-Process Communication) のハンドラー設定
  - **ステータス**: 完了
  - **成果物**: `src/main/ipc/index.ts`, `src/preload/index.ts` (更新)

### フェーズ3：フロントエンドUIの構築
- [x] React + Tailwind CSS によるUIのベース構築（サイドバー、メインエリア）
  - **ステータス**: 完了
  - **成果物**: `src/renderer/src/App.tsx`, `Sidebar.tsx`, `index.css`
- [x] ダッシュボードへのカード型リスト表示の実装
  - **ステータス**: 完了
  - **成果物**: `src/renderer/src/components/ArticleCard.tsx`
- [x] 「更新ボタン」と IPC 呼び出しの連携
  - **ステータス**: 完了
  - **成果物**: `App.tsx` (IPC連携)

### フェーズ4：結合とテスト
- [x] Telegram → バックエンド → UI までの通しテスト
  - **ステータス**: 完了
  - **成果物**: 画面上の表示確認
- [x] エラーハンドリングの追加と送信元名の表示（UI改善）
  - **ステータス**: 完了
  - **成果物**: `src/main/telegram/index.ts`, `ArticleCard.tsx` (送信元の表示対応)
