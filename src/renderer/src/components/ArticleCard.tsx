import React from 'react'
import { Article } from '../types'

interface ArticleCardProps {
  article: Article
}

// カテゴリに応じたバッジの色を決定するヘルパー関数
const getCategoryColor = (category: string) => {
  const c = category.toLowerCase()
  if (c.includes('テクノロジー') || c.includes('it') || c.includes('tech')) {
    return 'bg-blue-100 text-blue-700 border-blue-200'
  }
  if (c.includes('政治')) {
    return 'bg-purple-100 text-purple-700 border-purple-200'
  }
  if (c.includes('経済') || c.includes('ビジネス')) {
    return 'bg-emerald-100 text-emerald-700 border-emerald-200'
  }
  if (c.includes('エンタメ')) {
    return 'bg-pink-100 text-pink-700 border-pink-200'
  }
  if (c.includes('スポーツ')) {
    return 'bg-orange-100 text-orange-700 border-orange-200'
  }
  return 'bg-slate-100 text-slate-600 border-slate-200'
}

// Unixタイムスタンプを人間が読みやすい形式に変換
const formatDate = (unixTimestamp: number) => {
  const date = new Date(unixTimestamp * 1000)
  return new Intl.DateTimeFormat('ja-JP', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const badgeColor = getCategoryColor(article.category)

  // 改行区切りの箇条書きテキストをパースしてリスト化
  const summaryItems = article.content_summary
    .split('\n')
    .map(line => line.replace(/^・\s*/, '').trim())
    .filter(line => line.length > 0)

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full group">
      {/* Header: Category & Date */}
      <div className="flex justify-between items-start mb-4">
        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${badgeColor} inline-block`}>
          {article.category}
        </span>
        <div className="text-right">
          <div className="text-xs text-slate-400 font-medium mb-1">
            {formatDate(article.source_date)}
          </div>
          <div className="text-[10px] text-slate-400 font-medium bg-slate-100 px-1.5 py-0.5 rounded flex items-center justify-end max-w-fit ml-auto">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
            <span className="truncate max-w-[100px]" title={article.source_name || 'Telegram'}>{article.source_name || 'Telegram'}</span>
          </div>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-lg font-bold text-slate-800 leading-tight mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {article.title}
      </h2>

      {/* Summary */}
      <div className="flex-1">
        <ul className="space-y-2 text-sm text-slate-600">
          {summaryItems.map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-500 mr-2 mt-0.5">•</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer: Read More Link */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          元記事を読む
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  )
}
