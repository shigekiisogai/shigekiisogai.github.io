# 磯貝 茂樹 / Shigeki ISOGAI — 本番準備（未公開）

予定repo: shigekiisogai/shigekiisogai.github.io（public）。remote未設定。site=https://shigekiisogai.github.io、base=/。

公開候補はWordPress既存14ページ＋Interactive Microeconomics（index＋7章）＋旧日本語slugの転送＋404。事例集はソース・ビルド・ナビに含めない。Teaching一覧は /courses/、Interactiveは /materials/interactive/ とし既存project Pagesの /teaching/ にファイルを置かない（推奨案、最終承認待ち）。

Node24: `npm ci --ignore-scripts` → `npm run check:publish` → `npm run build:github` → `npm run build:cloudflare` → `npm test` → `npm run check:links` → `npm run check:content`。

本文はsrc/content/pages/。元の公開本文を維持。講義ノート/PDFは元のDriveリンクのままでファイル移管ではない。check:contentは元本文のSHA256・基準テキスト・リンクを検査し、旧Interactiveリンク1件の配信時変換のみ明示する。未承認基準acceptはしない。

共通resource導線を本文外に追加。footerは旧移行試作表記と元ページリンクを現状維持。公開前には外部APPROVAL_SHEETを確認。main pushでActionsが配信するため承認前のrepo作成/push/Pages変更は禁止。docs/search-console.md参照。
