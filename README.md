# 磯貝 茂樹 / Shigeki ISOGAI

最小公開Aの本番準備。未公開。予定repo: shigekiisogai/shigekiisogai.github.io（public）。remote未設定。URL: https://shigekiisogai.github.io/ 。

Node 24: `npm ci --ignore-scripts` → `npm run check:publish` → `npm run build:github` → `npm run build:cloudflare` → `npm test` → `npm run check:links` → `npm run check:content`。

本文: src/content/pages/。公開範囲はHome / Research / 日本語 / 404。検索対象は3本文のみ、404はnoindex。旧試作のnoindex前提テストは本番SEO検査に置換。既存teachingのファイルは含めない。公開repoはソースと履歴も閲覧可能。本文の承認は別添APPROVAL_SHEETで行い、公開は承認まで禁止。

workflowは既存SHA固定Actionsを流用。main pushで公開するため、承認前にGitHub repo作成・push・Pages設定を行わない。Search Consoleはdocs/search-console.md、出典はdocs/source.md。
