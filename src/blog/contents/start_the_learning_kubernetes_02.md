<!-- 
title: 一足遅れて Kubernetes を学び始める - 02. Docker For Mac -
date: 2019-04-27T00:00:00+09:00
draft: false
description: description
-->
# Links
https://qiita.com/silverbirder/items/d1aa368568885df2e44f

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
[一足遅れて Kubernetes を学び始める - 01. 環境選択編 -](https://qiita.com/silverbirder/items/34b823c1a4449d40e610)にて、Kubernetesを学ぶ環境を考えてみました。いきなりGKEを使うんじゃなくて、お手軽に試せるDockerForMacを使おうとなりました。

# Docker For Mac を試す

## 環境

```text:machine
iMac (21.5-inch, 2017)
```
```text:docker
Docker Community Edition:
  Version: 18.06.1-ce-mac73 (26764)
Docker Engine:
  Version: 18.06.1-ce
Kubernetes:
  Version: v1.10.3
```

## 実践
さっそく、使ってみます。 ([入門 Kubernetes](https://www.oreilly.co.jp/books/9784873118406/)参考)

```console
~ $ kubectl get componentstatuses
NAME                 STATUS    MESSAGE              ERROR
controller-manager   Healthy   ok
scheduler            Healthy   ok
etcd-0               Healthy   {"health": "true"}
```
Kubernetesでは、MasterNodeとWorkerNodeの2種類のNodeが存在しており、
そのうちのMasterNodeにあるコンポーネントの一覧が上記よりわかります。詳細については、[こちら](https://qiita.com/tkusumi/items/c2a92cd52bfdb9edd613)にあります。
要は、`kubectl apply -f nginx.yaml` とすると

1. etcdにマニュフェスト(nginx.yaml)を登録
1. controller-managerがetcdにあるマニュフェストと既存podを比べてpodが少ないことを検知
1. schedulerが適切な数のpodに調整

という理解になりました。また、全てのやり取りは、api-serverを経由しているそうです。

私なりの理解をアウトプットしたものが下記になります。
(ほとんど真似した感じです。しかし、アウトプットするだけで理解が深まるため実施。 **アウトプット大事！** )
![Kubernetes_learning.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/143813/f53b8321-a01c-c03e-77cb-2e90a1ca30ef.png)


```console
~ $ kubectl get nodes
NAME                 STATUS    ROLES     AGE       VERSION
docker-for-desktop   Ready     master    120d      v1.10.3
~ $ kubectl get pods
No resources found.
```
使い始めたばかりだと、podが１つもない状態ですね。
また、DockerForMacでは、もちろん動かしているマシンは一台（VMとか使えば増やせますが）なので、
MasterNodeとWorkerNodeが同一になっているはずです。試してみます。

```nginx.yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
    - name: nginx
      image: nginx
      ports:
       - containerPort: 80
         name: http
         protocol: TCP
```

```console
~ $ kubectl apply -f nginx.yaml
pod "nginx" created
~ $ kubectl get pod -o wide
NAME      READY     STATUS    RESTARTS   AGE       IP           NODE
nginx     1/1       Running   0          3m        10.1.0.157   docker-for-desktop
```

WorkerNodeにPodが作られていますね。んー、これだとある程度の学習には繋がりそう（Podの動き）ですが、
後の学ぶReplicaSetやDaemonsetなどNode横断した機能を経験したい場合には不向きのようですね。
まあ、簡単に使えるので良いっちゃ良いのですが...

次は、いくつかのコマンド(cp,exec, port-forward)を試してみます。

```console
~ $ touch memo.txt
~ $ ls
nginx.yaml memo.txt
~ $ kubectl cp memo.txt nginx:/memo.txt
~ $ rm memo.txt
~ $ ls
nginx.yaml
~ $ kubectl cp nginx:/memo.txt ./memo.txt
~ $ ls
nginx.yaml memo.txt
~ $ kubectl exec -it nginx bash
root@nginx:/# exit
exit
~ $
```

ローカルとPodとの双方向コピー、仮想的なターミナルを体験していました。
「ふ〜ん、で？」ってなっちゃいました。(笑)

# お片付け

```console
~ $ kubectl delete -f nginx.yaml
pod "nginx" deleted
```

# ものたりない
やっぱりNode増やしたい！！
[Raspberry PiでおうちKubernetes構築【論理編】](https://qiita.com/go_vargo/items/29f6d832ea0a289b4778)を見て、これをやるっきゃない！
すごく今更だけど、試してみようと思います。
次回は[こちら](https://qiita.com/silverbirder/items/cfaaba136b74b3140902)です。
