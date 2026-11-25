# ローカル修正完了報告（2026-11-25）

本人11/25承認範囲のソース修正・教材照合・回帰テストを完了。公開先は新public repo shigekiisogai/shigekiisogai.github.io。今回の作業はローカルで実施。

- Teaching /courses/ は元の授業名・担当歴をすべて保持し、Course Materialsへの案内1行を掲載。共通の教材直リンクと講義ディレクトリをTeachingから除外。日本語ページ本文は元から授業別リンクがなく、全ページの共通ナビからも六授業を除外。
- 六授業の原文ソースを保持し、生成・sitemap・全ナビから除外。旧日本語ゲーム理論slugの転送も除外。公開は16 canonical、4転送、404の各ビルド21 HTML。
- 六授業の170リンクを元URL（queryを含む）で照合。既存0、追加166、指定除外4（本人指定Drive 2、教材使用方針リンク2）。元の表示名・URL・授業名見出しを保持。重複URLの出現とquery違いも原文どおり記録。MATERIALS_RECONCILIATION.md / .json とrepoのprovenance/materials-reconciliation.jsonに証跡を保存。
- 原本provenanceの3ファイルを維持。承認差分はapproved-revision.jsonで明示し、原本のSHA256と公開テキスト・リンクに対して別途検証。教材の改行は追記部分でbrに統一。
- 両build、npm test（41件）、check:links、check:publish、check:contentが成功。全href/srcは各717参照、内部パス・fragmentエラー0。Homeから公開canonical全16ページに到達。二Drive IDは全ビルドファイルを走査して掲載0。依存関係によるビルド問題0。

教材以外の本文（試験日時・時間・範囲・持込条件、注意書き、教材使用方針、講義説明等）は、作業範囲のREPORT.mdの新しい追記に原文で全件保存。再掲載方針は本人確認が必要。

未確認・引継ぎ：親担当によるnpm ci --ignore-scripts後の再検証、ブラウザ確認、repo作成・push・公開、実URL検収、外部資料のアクセスと内容確認。Search Consoleは本人操作待ち。今回ネットワーク・push・gh・公開・WordPress操作は実施していない。

詳細な実行結果は作業範囲のLOCAL_REVISION_CHECKS.json、ログはlocal-revision-logs/を参照。commitは作業範囲のLOCAL_REVISION_REPORT.mdに記録する。
