# 磯貝 茂樹 / Shigeki ISOGAI — 承認済み公開候補

本人2026-11-25承認：新しいpublic repo `shigekiisogai/shigekiisogai.github.io` で公開。site=https://shigekiisogai.github.io、base=/。repo作成・push・公開・実URL検収は親担当が行う。

Teachingは `/courses/` に担当授業と過去の授業名・歴史を保存し、Course Materialsへの案内を1行掲載。教材は `/course-materials/`、Interactiveは `/materials/interactive/`。公開本文8ページ＋Interactive（入口＋7章）の16 canonical、旧日本語slug転送4件と404。事例集は含めない。旧 `/teaching/` にファイルを生成しない。

六授業の原文ソースは保持し、ビルド・sitemap・ナビから除外。教材リンクは元の表示名・URLを維持してCourse Materialsに集約。本人指定の二Driveは公開物から除外。`provenance/materials-reconciliation.json` は元リンク全件の照合証跡。教材以外の授業案内等と本人確認事項は作業範囲のREPORT.md追記を参照。

Node24。親担当が `npm ci --ignore-scripts` を別途実行する。ローカル検証：`npm run build:github`、`npm run build:cloudflare`、`npm test`、`npm run check:links`、`npm run check:publish`、`npm run check:content`。外部URLへのアクセス検査とブラウザ検収は親担当。

`check:content` は原本provenanceのSHA256・基準テキスト・リンクを維持して検証し、11/25承認差分を `provenance/approved-revision.json` と照合する。教材本文は原本＋明示した追記、Teachingは原本＋案内1行。元Interactiveリンクの配信時変換も維持する。基準のaccept操作は行わない。

Search Consoleの本人操作は docs/search-console.md 参照。
