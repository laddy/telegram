import { GoogleGenerativeAI } from '@google/generative-ai'
import dotenv from 'dotenv'

dotenv.config()

export interface ArticleSummary {
  summary: string
  category: string
}

const CATEGORIES = [
  '政治',
  '経済',
  'テクノロジー',
  'エンタメ',
  'スポーツ',
  'ライフスタイル',
  'サイエンス',
  '国際',
  '国内',
  'その他'
]

/**
 * Gemini API を用いて記事本文の要約とカテゴリ分類を行います。
 * @param title 記事のタイトル
 * @param content 記事の本文（プレーンテキスト）
 * @returns 3行要約とカテゴリを含むオブジェクト
 */
export async function summarizeArticle(title: string, content: string): Promise<ArticleSummary> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not defined in .env file')
  }

  const genAI = new GoogleGenerativeAI(apiKey)
  // 最新のモデルを指定（gemini-1.5-flash は非推奨/削除されているため gemini-2.5-flash を利用）
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' })

  const prompt = `
以下のニュース記事を分析し、JSON形式で結果を返してください。

【指示】
1. 記事の内容を理解し、重要なポイントを3つの箇条書き（箇条書きの先頭は「・」）で要約してください。
2. 以下のカテゴリの中から、この記事に最もふさわしいものを1つ選んでください。
   カテゴリ候補: [${CATEGORIES.join(', ')}]

【JSON出力フォーマット】
{
  "summary": "・ポイント1\\n・ポイント2\\n・ポイント3",
  "category": "選んだカテゴリ"
}

【記事データ】
タイトル: ${title}
本文:
${content}
`

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
      }
    })

    const responseText = result.response.text()
    const parsedData = JSON.parse(responseText) as ArticleSummary

    // category が候補に含まれているか簡単なバリデーション（含まれていなければ 'その他'）
    if (!CATEGORIES.includes(parsedData.category)) {
      parsedData.category = 'その他'
    }

    return parsedData
  } catch (error) {
    console.error('Gemini API summarization failed:', error)
    throw new Error('Failed to summarize article with AI')
  }
}
