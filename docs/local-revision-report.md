# ローカル修正完了報告（本人追加指示2回目・2026-11-25）

前回基準commit: 77f0b79b228334cbcc1649c3a021d4db977847f6。再公開・実URL検収は親担当。以下は今回のローカル修正結果。

- WP ID431、microeconomics-grad-school（2025年1月更新）の追加セクション1件・教材リンク28件をCourse Materialsから削除。照合レコード30件すべてを「旧大学院ミクロのため非移管」に更新。元リンクと表示名は保持。
- 全170件の現在の内訳：追加138、指定除外2、旧大学院ミクロのため非移管30、既存0。他5授業の教材補完を維持。
- 元Course Materials本文との同一URLは0件。他5授業との同一URLは1件で、その授業由来のリンクを保持。元本文・原本provenance 3ファイルを保持。
- 六授業の非生成・sitemap非掲載・全ページからの非リンク、二Drive IDの全ビルド非掲載を維持。元本文に同一URLがある場合の保持と、他授業由来の保持を回帰テストに追加。
- npm testは45件成功（前回41件から4件追加）。両build、check:links、check:content成功。各ビルド21 HTML・689 href/src参照、内部パス・fragmentエラー0。Course Materialsは161リンク（前回189から28減）。check:publishおよび原本差分・差分形式の最終検査結果はLOCAL_REVISION_CHECKS.jsonに記録。

今回のネットワーク・gh・push・公開・WordPress操作は0件。他repoは変更していない。親から前回公開の16 URL全200・ビルド一致との引継ぎあり。今回の再push・再検収は親担当。

## 履歴：前回ローカル修正報告

以下はcommit 77f0b79時点の記録。現在の教材移管方針・件数・公開状況は上記を参照。

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

最終commit: 77f0b79b228334cbcc1649c3a021d4db977847f6

作業ツリー: clean。両build・41テスト・check:links・check:publish・check:content成功。親担当のnpm ci、ブラウザ、公開・実URL検収と、REPORT追記の教材以外の情報の扱いが未確認。
