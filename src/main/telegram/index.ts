import { Telegraf } from 'telegraf'
import { getDB } from '../db'
import dotenv from 'dotenv'

// load .env file
dotenv.config()

export interface TelegramUrlItem {
  url: string
  source_date: number
  source_name: string
}

export async function fetchNewUrls(): Promise<TelegramUrlItem[]> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  if (!token) {
    throw new Error('TELEGRAM_BOT_TOKEN is not defined in .env file')
  }

  const bot = new Telegraf(token)
  const db = getDB()

  // Get last update_id
  const row = await db.get(`SELECT value FROM settings WHERE key = 'last_update_id'`)
  const lastUpdateId = row && row.value ? parseInt(row.value, 10) : 0

  console.log(`Fetching updates from Telegram since update_id: ${lastUpdateId}...`)

  const offset = lastUpdateId ? lastUpdateId + 1 : undefined
  
  let updates;
  try {
    updates = await bot.telegram.getUpdates(undefined, 100, offset)
  } catch (error) {
    console.error('Failed to fetch updates from Telegram API:', error)
    throw error
  }

  if (!updates || updates.length === 0) {
    console.log('No new updates found.')
    return []
  }

  const newUrls: TelegramUrlItem[] = []
  let maxUpdateId = lastUpdateId

  for (const update of updates) {
    if (update.update_id > maxUpdateId) {
      maxUpdateId = update.update_id
    }

    if ('message' in update && update.message && 'text' in update.message) {
      const msg = update.message
      const text = msg.text
      const entities = msg.entities || []
      
      // 送信元の名前（チャンネル名、グループ名、またはユーザー名）を取得
      let sourceName = 'Unknown'
      if (msg.chat) {
        if (msg.chat.type === 'private') {
          sourceName = msg.chat.username || msg.chat.first_name || 'Private User'
        } else if (msg.chat.type === 'group' || msg.chat.type === 'supergroup' || msg.chat.type === 'channel') {
          sourceName = msg.chat.title || 'Group/Channel'
        }
      }

      // Extract URLs from entities
      for (const entity of entities) {
        if (entity.type === 'url') {
          const url = text.substring(entity.offset, entity.offset + entity.length)
          newUrls.push({ url, source_date: msg.date, source_name: sourceName })
        } else if (entity.type === 'text_link' && entity.url) {
          newUrls.push({ url: entity.url, source_date: msg.date, source_name: sourceName })
        }
      }
    }
  }

  // Save the new max update_id
  if (maxUpdateId > lastUpdateId) {
    await db.run(
      `INSERT INTO settings (key, value) VALUES ('last_update_id', ?) 
       ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
      [maxUpdateId.toString()]
    )
    console.log(`Updated last_update_id to ${maxUpdateId}`)
  }

  return newUrls
}
