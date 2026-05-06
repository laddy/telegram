import { summarizeArticle } from './src/main/ai'

async function main() {
  const title = 'テスト記事: AIの進化と未来'
  const content = '人工知能（AI）技術は近年急速な進化を遂げています。特に大規模言語モデル（LLM）の登場により、自然言語処理の精度が飛躍的に向上しました。これにより、カスタマーサポートの自動化や、プログラミングのコーディング支援など、多くのビジネス分野でAIの導入が進んでいます。しかし、一方でAIによるフェイクニュースの生成や、雇用の減少といった懸念も指摘されており、法整備や倫理的なガイドラインの策定が急務となっています。今後は、人間とAIがどのように協調して社会を構築していくかが最大の課題となるでしょう。'
  
  console.log('Summarizing article...')
  try {
    const result = await summarizeArticle(title, content)
    console.log('--- Result ---')
    console.log('Category:', result.category)
    console.log('Summary:')
    console.log(result.summary)
    console.log('--------------')
  } catch (error) {
    console.error(error)
  }
}

main()
