<!-- 
title: 一足遅れて Kubernetes を学び始める  - 01. 環境選択編 -
date: 2019-04-18T00:00:00+09:00
draft: false
description: description
-->
# Links
https://qiita.com/silverbirder/items/34b823c1a4449d40e610

# ストーリー
1. [一足遅れて Kubernetes を学び始める - 01. 環境選択編 -](https://qiita.com/silverbirder/items/34b823c1a4449d40e610)
1. [一足遅れて Kubernetes を学び始める - 02. Docker For Mac -](https://qiita.com/silverbirder/items/d1aa368568885df2e44f)
1. [一足遅れて Kubernetes を学び始める - 03. Raspberry Pi -](https://qiita.com/silverbirder/items/cfaaba136b74b3140902)
1. [一足遅れて Kubernetes を学び始める - 04. kubectl -](https://qiita.com/silverbirder/items/7ae773b6519b940b5be4)
1. [一足遅れて Kubernetes を学び始める - 05. workloads その1 -](https://qiita.com/silverbirder/items/7041aa5d4126a6784d59)
1. [一足遅れて Kubernetes を学び始める - 06. workloads その2 -](https://qiita.com/silverbirder/items/d3522237b28703a9adb6)
1. [一足遅れて Kubernetes を学び始める - 07. workloads その3 -](https://qiita.com/silverbirder/items/937e1b5f6b3589452932)
1. [一足遅れて Kubernetes を学び始める - 08. discovery&LB その1 -](https://qiita.com/silverbirder/items/3a46ab92b45cdcc56ccd)
1. [一足遅れて Kubernetes を学び始める - 09. discovery&LB その2 -](https://qiita.com/silverbirder/items/f6290a7868849d57b9f1)
1. [一足遅れて Kubernetes を学び始める - 10. config&storage その1 -](https://qiita.com/silverbirder/items/cb17f02f52c7b5c2aafd)
1. [一足遅れて Kubernetes を学び始める - 11. config&storage その2 -](https://qiita.com/silverbirder/items/8d7a5473fa6969954e21)
1. [一足遅れて Kubernetes を学び始める - 12. リソース制限 -](https://qiita.com/silverbirder/items/5c0703f8fa055ade9f21)
1. [一足遅れて Kubernetes を学び始める - 13. ヘルスチェックとコンテナライフサイクル -](https://qiita.com/silverbirder/items/8df21f399c453b9f8e51)
1. [一足遅れて Kubernetes を学び始める - 14. スケジューリング -](https://qiita.com/silverbirder/items/cae4649d9f9336bc01fd)
1. [一足遅れて Kubernetes を学び始める - 15. セキュリティ -](https://qiita.com/silverbirder/items/8ea729949ab3bb4cf540)
1. [一足遅れて Kubernetes を学び始める - 16. コンポーネント -](https://qiita.com/silverbirder/items/a68499a10dd00c192947)

# 経緯
Kubernetesを使えるようになりたいな〜（定義不明）
けど、他にやりたいこと（アプリ開発）あるから後回しにしちゃえ〜！！
と、今までずっと、ちゃんと学ばなかったKubernetesを、本腰入れて使ってみようと思います。 :sparkles: 

# 環境
```text:machine
iMac (21.5-inch, 2017)
```
私の知識レベルは、
「Kubernetesはコンテナオーケストレーションしてくれるやつでしょ」というざっくり認識で、関連用語は耳にしたことがあるだけで、よく理解できていません。

# 最初、何から始めよう？
マネージドサービスのGKE使ったほうが、最初は楽で簡単だから、そっちを使ったほうが良いみたいです。 :heart_eyes: 

***
## GKE SetUp
![スクリーンショット 2019-04-18 21.11.23.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/143813/ad09881d-d3b7-1e03-48e4-a41466fb857d.png)
ノードってのは、ポッド（コンテナ）を入れるマシンなんだっけな。 ([PodとNode](https://nownabe.github.io/kubernetes-doc/tutorials/kubernetes_basics/3_explore_your_app.html))
***
![スクリーンショット 2019-04-18 21.11.37.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/143813/680b83b8-d59a-e4f7-4497-5b4d542fc796.png)
まあ、デフォルトで良いよね :thinking: 
***
![スクリーンショット 2019-04-18 21.11.54.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/143813/b5f2b248-28a2-77a5-649e-4d9e85d58ace.png)

単語がどれも分からなさすぎる...(Istio?自動プロビジョニング?垂直ポッド自動スケーリング？) :thinking: :thinking: :thinking: 

# MacでKubernetes試せるから、そっちで学んでいこう...
ちょっと意味がわからない状態で、GKE動かしたらお金がかかる上に、何してるのか分からないから、もったいない。
Docker For MacにKubernetes使えるみたいだから、まずはそっちを使って学んでいこうかな。。。 :muscle: 

次回は[こちら](https://qiita.com/silverbirder/items/d1aa368568885df2e44f)です。
