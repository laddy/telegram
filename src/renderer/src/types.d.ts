export interface Article {
  id: number
  url: string
  title: string
  content_summary: string
  category: string
  source_date: number
  source_name: string
  created_at: string
}

declare global {
  interface Window {
    api: {
      getArticles: () => Promise<Article[]>
      syncTelegramArticles: () => Promise<Article[]>
    }
  }
}
