import { useState, useEffect } from 'react'
import { Sidebar } from './components/Sidebar'
import { ArticleCard } from './components/ArticleCard'
import { Loader } from './components/Loader'
import { Article } from './types'

function App() {
  const [articles, setArticles] = useState<Article[]>([])
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)

  // 初回起動時にDBから記事を取得
  useEffect(() => {
    const fetchInitialArticles = async () => {
      try {
        const data = await window.api.getArticles()
        setArticles(data)
      } catch (error) {
        console.error('Failed to load articles:', error)
      } finally {
        setIsInitialLoading(false)
      }
    }
    fetchInitialArticles()
  }, [])

  // 同期ボタンが押された時の処理
  const handleSync = async () => {
    setIsSyncing(true)
    try {
      const updatedArticles = await window.api.syncTelegramArticles()
      setArticles(updatedArticles)
    } catch (error) {
      console.error('Failed to sync articles:', error)
      alert('記事の同期中にエラーが発生しました。')
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans">
      <Sidebar isSyncing={isSyncing} onSync={handleSync} />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-8 py-10">
          {/* Header */}
          <header className="mb-8 flex justify-between items-end">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 tracking-tight">すべての記事</h2>
              <p className="text-slate-500 mt-2 text-sm">
                Telegramから抽出・要約された最新のニュース一覧です
              </p>
            </div>
            <div className="text-sm font-medium text-slate-400">
              全 {articles.length} 件
            </div>
          </header>

          {/* Content Area */}
          {isInitialLoading ? (
            <Loader />
          ) : articles.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
              <svg className="mx-auto h-12 w-12 text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5L18.5 6M15 6v7H4" />
              </svg>
              <h3 className="text-lg font-medium text-slate-900 mb-1">記事がありません</h3>
              <p className="text-sm text-slate-500">
                左下の「新着記事を同期」ボタンを押して、Telegramから記事を取得してください。
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
