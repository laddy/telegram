import React from 'react'

interface SidebarProps {
  isSyncing: boolean
  onSync: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isSyncing, onSync }) => {
  return (
    <div className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col shadow-sm z-10 flex-shrink-0">
      {/* App Header */}
      <div className="p-6 border-b border-slate-100">
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight">
          Telegram News
        </h1>
        <p className="text-xs text-slate-400 mt-1">Summary Dashboard</p>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4">
        <nav className="space-y-1 px-3">
          <a
            href="#"
            className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg bg-blue-50 text-blue-700"
          >
            <svg
              className="w-5 h-5 mr-3 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            すべての記事
          </a>
        </nav>
      </div>

      {/* Sync Button Area */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        <button
          onClick={onSync}
          disabled={isSyncing}
          className={`w-full flex items-center justify-center py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm
            ${
              isSyncing
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-md hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5'
            }
          `}
        >
          {isSyncing ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              同期中...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              新着記事を同期
            </>
          )}
        </button>
      </div>
    </div>
  )
}
