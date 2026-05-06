import { JSDOM } from 'jsdom'
import { Readability } from '@mozilla/readability'

export interface ScrapedArticle {
  title: string
  textContent: string | null
}

/**
 * URLから記事のメインコンテンツを抽出します
 * @param url 記事のURL
 * @returns 記事のタイトルと抽出された純粋なテキスト本文
 */
export async function scrapeArticle(url: string): Promise<ScrapedArticle> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${url} (status: ${response.status})`)
    }

    const html = await response.text()

    // jsdomを使って仮想DOMを構築
    const doc = new JSDOM(html, { url })

    // Readabilityを使ってメインコンテンツを抽出
    const reader = new Readability(doc.window.document)
    const article = reader.parse()

    if (!article) {
      // パース失敗時はフォールバックとしてtitleのみ返す
      return {
        title: doc.window.document.title || 'No Title',
        textContent: null
      }
    }

    return {
      title: article.title,
      textContent: article.textContent
    }
  } catch (error) {
    console.error(`Scraping failed for ${url}:`, error)
    throw error
  }
}
