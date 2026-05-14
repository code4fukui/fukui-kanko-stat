# fukui-kanko-stat

福井県観光アンケートのオープンデータを分析・可視化するためのオープンソースWebアプリケーションです。

## デモ
- [観光オープンデータのシンプル分析](https://code4fukui.github.io/fukui-kanko-stat/)
- [観光アンケートトレンド](https://code4fukui.github.io/fukui-kanko-stat/trend.html)
- [アンケート回答数推移（日別）](https://code4fukui.github.io/fukui-kanko-stat/daily.html)
- [観光コメントマップ](https://code4fukui.github.io/sightseeingApp/)
- [コメント新着順](https://code4fukui.github.io/fukui-kanko-stat/comment.html)
- [コメント検索](https://code4fukui.github.io/fukui-kanko-stat/comment-search.html)
- [観光エリア満足度ランキング](https://code4fukui.github.io/fukui-kanko-stat/ranking.html)
- [都道府県別好印象ランキング](https://code4fukui.github.io/fukui-kanko-stat/favourable-impression.html)
- [滞在人口1kmメッシュマップ](https://code4fukui.github.io/fukui-kanko-stat/population.html)
- [Instagramハッシュタグとアンケートの相関](https://code4fukui.github.io/fukui-kanko-stat/instagram-hash-tag.html)
- [RENEW Pay連携データエクスプローラー](https://code4fukui.github.io/fukui-kanko-stat/renew-pay-log.html)
- [Instagramハッシュタグ投稿数トレンド](https://code4fukui.github.io/fukui-kanko-hashtag/)

## 特徴
- **包括的なデータ可視化:** 属性、エリア、期間の絞り込み機能を備えたインタラクティブな円グラフ、折れ線グラフ、棒グラフでアンケートデータを分析します。
- **トレンドと相関分析:** 日別のアンケート回答数と現地の気象データを追跡します。Instagramのハッシュタグの人気度とアンケート回答のトレンドとの相関を分析します。
- **地理空間分析:** 観光客のコメントを地図上に可視化し、1kmメッシュで滞在人口密度を探索します。
- **満足度ランキング:** 訪問者の満足度スコアに基づいて観光エリアをランク付けします。訪問者の居住都道府県に基づく福井県の「好印象」ランキングを表示します。
- **コメント分析:** 最新のアンケートコメントを時系列順に閲覧したり、キーワード検索を実行したりできます。観光エリア、県内外の訪問者、年代でコメントを絞り込むことができます。
- **連携データの探索:** RENEW Payシステムの決済データとアンケート回答を連携させて分析します。

## データソース
- [福井県観光アンケート オープンデータ](https://github.com/code4fukui/fukui-kanko-survey/)
- [福井県Instagramハッシュタグ投稿数](https://github.com/code4fukui/fukui-kanko-hashtag/)
- [福井県観光スポット一覧](https://github.com/code4fukui/fukui-spot)
- [全国の人流オープンデータ（1kmメッシュ）](https://www.geospatial.jp/ckan/dataset/mlit-1km-fromto)

## ライセンス
MIT License — 詳細は [LICENSE](LICENSE) を参照してください。
