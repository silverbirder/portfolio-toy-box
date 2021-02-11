<!-- 
title: 一足遅れて Kubernetes を学び始める - 11. config&storage その2 -
date: 2019-05-27T00:00:00+09:00
draft: false
description: description
-->
# Links
https://qiita.com/silverbirder/items/8d7a5473fa6969954e21

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

# 前回
[一足遅れて Kubernetes を学び始める - 10. config&storage その1 -](https://qiita.com/silverbirder/items/cb17f02f52c7b5c2aafd)では、configについて学習しました。
今回は、storageを学びます。

# VolumeとPresistentVolume
Volumeは、あらかじめ決められた利用可能なボリュームを指します。こちらは、ボリュームの削除や新規作成ができません。
PresistentVolumeは、外部にある永続ボリュームを指します。こちらは、ボリュームの削除や新規作成ができます。
DBのようなステートフルなものはPresistentVolumeを使います。
一時的なものなら、Volumeを使うのですかね？ 

※ PresistentVolumeClaimは、PresistentVolumeをアサインするためのリソース。

# Volumeの種類
書籍（kubernetes完全ガイド）で紹介されていたVolumeの種類は、下記のとおりです。

* emptyDir
    * 一時的なディスク領域を利用
    * pod削除されると、emptyDirも削除
    * マウント先を指定できない
* hostPath
    * emptyDirのマウント先を指定できる版
* downwardAPI
    * Podの情報をファイルとして配置したファイルをマウント
* projected
    * secret/configMap/downwardAPI/serviceAccountTokenを１つにまとめたディレクトを作成し、マウント

※ [types-of-volumes](https://kubernetes.io/docs/concepts/storage/volumes/#types-of-volumes)

Volumeを残すことができないので、Podを削除する際は気をつけないとダメですね。
ログをファイルとして保存するなら、一時的にVolumeが良いのですかね。
ただ、定期的に外部ストレージに移さないといけないですので、手間です。
（そもそも、ログはストリームにして外部サービスに流すのがベスト）

プロダクトとしては、あんまり使い道ない...? 

# PresistentVolumeの種類

外部の永続ボリュームを利用します。例えば、下記の種類があります。

* GCE Persistent Disk
* AWS Elastic Block Store
* NFS
* iSCSI
* Ceph
* OpenStack Cinder
* GlusterFS

[一足遅れて Kubernetes を学び始める - 06. workloads その2 -](https://qiita.com/silverbirder/items/d3522237b28703a9adb6)では、NFSを使いましたね。
PersistentVolumeの作成方法は、外部の永続ボリュームによって違うのですが、共通して言えるところもあるみたいなので、
そこを書いてみます。

* ラベル
    * PersistentVolumeをラベリングすることで、指定しやすくする
* 容量
    * Volumeで要求する容量。最も小さい容量からアサインされる。
* アクセスモード
    * ReadWriteOnce
        * 単一ノードからRead/Writeが可能
    * ReadOnlyMany
        * 複数ノードからReadが可能
    * ReadWriteMany
        * 複数ノードからRead/Writeが可能
* Reclaim Policy
    * Volumeを使い終わったあと、破棄するか再利用するかのポリシー
        * Delete
            * PersistentVolumeの実体を削除
        * Retain
            * PersistentVolumeの実体を残さず保持
            * 再度マウントされない
        * Recycle
            * PersistentVolumeのデータを削除し、再利用可能にする
            * 再度マウントされる
            * （廃止予定で、DynamicProvisioningを利用すること)
* StorageClass
    * 各プロバイザーが提供するストレージの型
        * 基本的に自動作成されている 

# PersistentVolumeClaim
実際に、PresistentVolumeを使うためには、PresistentVolumeClaimで要求を出す必要があります。
必要な項目は、下記です。

* ラベルセレクタ
    * ラベルでフィルタリング
* 容量
    * 求めている容量
* アクセスモード
    * PresistentVolumeのアクセスモードを参照
* StorageClass
    * PresistentVolumeのStorageClassを参照

要求を満たしたVolumeがRetainPolicyだった場合、Claimを削除した時点で「Released」になります。

# 最後に
今回は、書籍をそのまま書いた感じになりました。
実際に試したのは、[一足遅れて Kubernetes を学び始める - 06. workloads その2 -](https://qiita.com/silverbirder/items/d3522237b28703a9adb6)です。
まあ、あんまり深くはハマらない方が良いのではと思いました。
次回は、[こちら](https://qiita.com/silverbirder/items/5c0703f8fa055ade9f21)です。
