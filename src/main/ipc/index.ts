import { ipcMain } from 'electron'
import { getDB } from '../db'
import { fetchNewUrls } from '../telegram'
import { scrapeArticle } from '../scraper'
import { summarizeArticle } from '../ai'

export function setupIpcHandlers() {
  // DBからすべての記事を取得する
  ipcMain.handle('get-articles', async () => {
    try {
      const db = getDB()
      const articles = await db.all('SELECT * FROM articles ORDER BY created_at DESC')
      return articles
    } catch (error) {
      console.error('Failed to get articles:', error)
      throw error
    }
  })

  // Telegramからの新着URL取得・スクレイピング・AI要約・DB保存の一連のパイプライン
  ipcMain.handle('sync-telegram-articles', async () => {
    try {
      const db = getDB()
      console.log('Starting sync process...')
      
      const newUrls = await fetchNewUrls()
      console.log(`Found ${newUrls.length} new URLs from Telegram.`)

      let processedCount = 0

      for (const item of newUrls) {
        try {
          // すでに処理済みのURLはスキップする
          const exists = await db.get('SELECT id FROM articles WHERE url = ?', [item.url])
          if (exists) {
            console.log(`Skipping already processed URL: ${item.url}`)
            continue
          }

          console.log(`Processing URL: ${item.url}`)
          
          // 1. スクレイピング
          const scraped = await scrapeArticle(item.url)
          if (!scraped.textContent || scraped.textContent.trim() === '') {
            console.log(`No text content found for ${item.url}, skipping.`)
            continue
          }

          // 2. Gemini API で要約とカテゴリ分類
          const aiResult = await summarizeArticle(scraped.title, scraped.textContent)

          // 3. DBへ保存
          await db.run(
            `INSERT INTO articles (url, title, content_summary, category, source_date, source_name) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [
              item.url,
              scraped.title,
              aiResult.summary,
              aiResult.category,
              item.source_date,
              item.source_name
            ]
          )

          console.log(`Successfully processed and saved: ${scraped.title}`)
          processedCount++
        } catch (err) {
          // 1つのURLの処理でエラーが起きても全体を止めず、ログだけ残して次へ進む（耐障害性）
          console.error(`Error processing URL ${item.url}:`, err)
        }
      }

      console.log(`Sync process completed. Processed ${processedCount} new articles.`)

      // 処理が終わったら、UI側に最新の記事一覧を返す
      const articles = await db.all('SELECT * FROM articles ORDER BY created_at DESC')
      return articles
    } catch (error) {
      console.error('Failed to sync telegram articles:', error)
      throw error
    }
  })
}
