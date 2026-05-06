import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'
import { app } from 'electron'
import path from 'path'

// Database instance
let db: Database | null = null

export async function initDB(): Promise<void> {
  if (db) return

  // ユーザーデータフォルダに保存することで、アプリ更新時もデータが保持される
  const dbPath = path.join(app.getPath('userData'), 'database.sqlite')
  
  console.log('Initializing database at:', dbPath)

  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  })

  // テーブルの作成
  await db.exec(`
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT UNIQUE,
      title TEXT,
      content_summary TEXT,
      category TEXT,
      source_date DATETIME,
      source_name TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `)

  // 既存のテーブルに対するカラム追加のマイグレーション（カラムが存在する場合はエラーになるためキャッチして無視）
  try {
    await db.exec(`ALTER TABLE articles ADD COLUMN source_name TEXT;`)
  } catch (err) {
    // すでにカラムが存在する場合は何もしない
  }
  
  console.log('Database initialized and tables verified.')
}

export function getDB(): Database {
  if (!db) {
    throw new Error('Database has not been initialized. Call initDB() first.')
  }
  return db
}
