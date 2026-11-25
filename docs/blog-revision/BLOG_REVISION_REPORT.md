# ブログリンク削除・ローカル改訂報告（2026-11-25）

本人の明示追加承認に沿って、日本語ページの旧ブログ紹介段落を削除しました。基準commitは `05ec55fb88966446a7f08f09b80a64645e5a19af` です。

- 削除URL（ソース確認）: `https://sisogaiblog.wordpress.com`。指示された末尾スラッシュ付き `https://sisogaiblog.wordpress.com/` と同じブログです。
- 出現箇所: 基準commitの `src/content/pages/japanese.md:16`（公開先 `/ja/`）の「日本語でのブログ」紹介段落1件。src/public全体を検索し、ほかの出現はありませんでした。削除後のsrc/publicと両build全ファイルではブログホストの出現0件です。
- 原本 `provenance/pages.json`・`body-sha256.json`・`interactive-inline.json` を保持し、`approved-revision.json` に削除段落と承認を追加しました。`check:content` は削除段落を復元して原本ハッシュを照合し、`check-original` は承認済みの本文・リンク削除を厳密に照合します。原本内の旧ブログURLは証跡として保持しています。
- 元Course Materials本文・追加部分、教材照合表はa2から変更0件。WP ID431の30リンク非移管、他5授業の教材追加、六授業の単独ページ非生成・非リンク、二Drive ID非掲載の検証が成功しました。教材ページのリンクは161件（Drive 152件）です。
- `WORDPRESS_NOTICE.md` は全文を読んでから更新し、13旧ページに新URLを追記しました。Teachingは `/courses/`、教材と六授業は `/course-materials/` です。13対応の現routes照合も成功しました。検収後の本人操作、ブログ非公開化の指定手順、旧個人サイトのホームを公開で残す操作との区別を明記しました。

検証はすべて成功しました。`npm test` は46件成功・失敗0件（ブログホスト不在の回帰テスト1件追加）。`build:github`・`build:cloudflare`、全npm check（links/content/publish）、check-site/original/revision、diff --check、原本・教材の基準commitとの一致確認を実行しました。両build各21 HTML、16公開canonical、4 redirectと404、公開本文8ページ×2buildの照合が成功しています。詳細は `BLOG_REVISION_CHECKS.json`、実行ログは同階層の `local-revision-logs/blog-*.log` に保存しました。

同階層の3文書と同じ内容を、commit用にrepoの `docs/blog-revision/` に保存しています。commitはGit履歴と作業後の同階層記録で確認できます。既存LOCAL_REVISION等はa2記録として保持しました。

今回の作業はローカルのみです。network・gh・push・WordPress操作は実施していません。再push・最終実URL検収は親担当、ブログの実設定確認・非公開化は検収後に本人が行います。ブログの実設定、公式Privacy settingsページの現在の記載は未確認です。公式出典URLは本人指定の https://wordpress.com/support/privacy-settings/ を記載しました。
