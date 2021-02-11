<!-- 
title: 一足遅れて Kubernetes を学び始める - 14. スケジューリング -
date: 2019-06-05T00:00:00+09:00
draft: false
description: description
-->
# Links
https://qiita.com/silverbirder/items/cae4649d9f9336bc01fd

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
[一足遅れて Kubernetes を学び始める - 13. ヘルスチェックとコンテナライフサイクル -](https://qiita.com/silverbirder/items/8df21f399c453b9f8e51)では、requestsやlimitといったヘルスチェックの仕方を学びました。今回は、Affinityなどによるスケジューリングについて学習します。

# スケジューリング
これから学ぶスケジューリングでは、大きく分けて２つに分類します。


* Podのスケジューリング時に特定のNodeを選択する方法
    * Affinity
    * Anti-Affinity
* Nodeに対して汚れをつけて、それを許容できるPodのみスケジューリングを許可する方法
    * 汚れ = Taints
    * 許容 = Tolerations

# Nodeのラベル確認
デフォルトで設定されているNodeのラベルを見てみます。

```console
pi@raspi001:~/tmp $ k get nodes -o json | jq ".items[] | .metadata.labels"
{
  "beta.kubernetes.io/arch": "arm",
  "beta.kubernetes.io/os": "linux",
  "kubernetes.io/arch": "arm",
  "kubernetes.io/hostname": "raspi001",
  "kubernetes.io/os": "linux",
  "node-role.kubernetes.io/master": ""
}
{
  "beta.kubernetes.io/arch": "arm",
  "beta.kubernetes.io/os": "linux",
  "kubernetes.io/arch": "arm",
  "kubernetes.io/hostname": "raspi002",
  "kubernetes.io/os": "linux",
  "node-role.kubernetes.io/worker": "worker"
}
{
  "beta.kubernetes.io/arch": "arm",
  "beta.kubernetes.io/os": "linux",
  "kubernetes.io/arch": "arm",
  "kubernetes.io/hostname": "raspi003",
  "kubernetes.io/os": "linux",
  "node-role.kubernetes.io/worker": "worker"
}
```

archやosはデフォルトで設定されているみたいです。
次以降の学習のため、ラベルをはります。

```console
pi@raspi001:~/tmp $ k label node raspi002 cputype=low disksize=200
pi@raspi001:~/tmp $ k label node raspi003 cputype=low disksize=300
```

# NodeSelector
最も簡単なNodeAffinityの設定です。
指定するラベルに属するNodeにPodを割り当てるようスケジューリングします。簡易なので、equality-baseのみしか指定できません。

では、disksizeが300のNode(raspi003)にPodを配置しましょう。

```yaml
# sample-nodeselector.yaml
apiVersion: v1
kind: Pod
metadata:
  name: sample-nodeselector
  labels:
    app: sample-app
spec:
  containers:
  - name: nginx-container
    image: nginx:1.12
  nodeSelector:
    disksize: "300"
```

```console
pi@raspi001:~/tmp $ k apply -f sample-nodeselector.yaml
pi@raspi001:~/tmp $ k get pods sample-nodeselector -o wide
NAME                  READY   STATUS    RESTARTS   AGE   IP             NODE       NOMINATED NODE   READINESS GATES
sample-nodeselector   1/1     Running   0          21s   10.244.2.130   raspi003   <none>           <none>
```

期待通りですね。OKです。
nodeSelectorはイコールでしか表現できないので、柔軟性に欠けます。

# Affinity
Affinityは、NodeSelectorよりも柔軟に設定できます。つまり、set-basedの指定方法です。
詳しくは[こちら](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#set-based-requirement)を参照下さい。今回はInオペレータを使います。

```yaml
# sample-node-affinity.yaml
apiVersion: v1
kind: Pod
metadata:
  name: sample-node-affinity
spec:
  affinity:
    nodeAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        nodeSelectorTerms:
        - matchExpressions:
          - key: disktype
            operator: In
            values:
            - hdd
      preferredDuringSchedulingIgnoredDuringExecution:
      - weight: 1
        preference:
          matchExpressions:
          - key: kubernetes.io/hostname
            operator: In
            values:
            - raspi002
  containers:
  - name: nginx-container
    image: nginx:1.12
```

NodeAffinityでは、requiredとpreferredの2つ設定できます。

* required
    * 必須スケジューリングポリシー
* preferred
    * 優先的に考慮されるスケジューリングポリシー

必須条件が「cputype=lowであるNode(raspi002,raspi003)」で、優先条件が「hostname=raspi002であるNode」です。
適用してみましょう。

```console
pi@raspi001:~/tmp $ k apply -f sample-node-affinity.yaml
pi@raspi001:~/tmp $ k get pods sample-node-affinity -o wide
NAME                   READY   STATUS              RESTARTS   AGE   IP       NODE       NOMINATED NODE   READINESS GATES
sample-node-affinity   0/1     ContainerCreating   0          5s    <none>   raspi002   <none>           <none>
```

確かにraspi002に配置されました。では、raspi002をスケジューリングできなくするとどうなるのでしょうか。

```console
pi@raspi001:~/tmp $ k delete -f sample-node-affinity.yaml
pi@raspi001:~/tmp $ k cordon raspi002
pi@raspi001:~/tmp $ k apply -f sample-node-affinity.yaml
pi@raspi001:~/tmp $ k get pods sample-node-affinity -o wide
NAME                   READY   STATUS              RESTARTS   AGE   IP       NODE       NOMINATED NODE   READINESS GATES
sample-node-affinity   0/1     ContainerCreating   0          11s   <none>   raspi003   <none>           <none>
```

今度は、raspi002をcordonしたので、raspi003に移りました。優先なので、満たされなくても良いのですね。必須条件が満たされなかったら、Pendingになります。

元に戻します。

```console
pi@raspi001:~/tmp $ k delete -f sample-node-affinity.yaml
pi@raspi001:~/tmp $ k uncordon raspi002
```

## ANDとOR

nodeSelectorTermsやmatchExpressionsは配列なので複数指定できます。

```yaml
# sample.yaml
nodeSelectorTerms:
  - matchExpressions:
    - A
    - B
  - matchExpressions:
    - C
    - D
```

上記の場合は、 (A and B) OR (C and D)という条件になります。

# Anti-Affinity
Anti-Affinityは、Affinityの逆です。つまり、特定Node以外のNodeに割り当てるよう
スケジューリングします。特別な指定はなく、単にAffinityの否定形式にするだけです。言葉だけですね。

# Inter-Pod Affinity
特定のPodが実行されているドメイン上へPodをスケジューリングするポリシーです。
Pod間を近づけることができるので、レイテンシを下げることができます。

まず、特定のPodは、先程のNodeSelectorで使ったものとします。

```console
pi@raspi001:~/tmp $ k apply -f sample-node-affinity.yaml
pi@raspi001:~/tmp $ k get pods sample-nodeselector -o wide
NAME                  READY   STATUS    RESTARTS   AGE   IP             NODE       NOMINATED NODE   READINESS GATES
sample-nodeselector   1/1     Running   0          36m   10.244.2.130   raspi003   <none>           <none>
```

```yaml
# sample-pod-affinity-host.yaml
apiVersion: v1
kind: Pod
metadata:
  name: sample-pod-affinity-host
spec:
  affinity:
    podAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
      - labelSelector:
          matchExpressions:
          - key: app
            operator: In
            values:
            - sample-app
        topologyKey: kubernetes.io/hostname
  containers:
  - name: nginx-container
    image: nginx:1.12
```

これだと、sample-appがあるNodeでkubernetes.io/hostname(=raspi003)と同じNodeにPodを割り振ります。つまり、raspi003にできるはずです。

```
pi@raspi001:~/tmp $ k apply -f sample-pod-affinity-host.yaml
pi@raspi001:~/tmp $  k get pods sample-pod-affinity-host -o wide
NAME                       READY   STATUS              RESTARTS   AGE   IP       NODE       NOMINATED NODE   READINESS GATES
sample-pod-affinity-host   0/1     ContainerCreating   0          11s   <none>   raspi003   <none>           <none>
```

期待通りraspi003にできています。
また、requiredだけでなく、preferredも設定できます。

```yaml
# sample-pod-affinity-arch.yaml
apiVersion: v1
kind: Pod
metadata:
  name: sample-pod-affinity-arch
spec:
  affinity:
    podAffinity:
      requiredDuringSchedulingIgnoredDuringExecution:
        - labelSelector:
            matchExpressions:
            - key: app
              operator: In
              values:
              - sample-app
          topologyKey: kubernetes.io/arch
      preferredDuringSchedulingIgnoredDuringExecution:
        - weight: 1
          podAffinityTerm:
            labelSelector:
              matchExpressions:
              - key: app
                operator: In
                values:
                - sample-app
            topologyKey: kubernetes.io/hostname
  containers:
    - name: nginx-container
      image: nginx:1.12
```

必須条件としては、下記のとおりです。

* 「labelがapp=sample-appであるPodが動いているNode(raspi003)で、kubernetes.io/archが同じNode(arm)」

これはraspi002(arm),raspi003(arm)どちらにも当てはまります。
そして、優先条件として、下記のとおりです。

* 「labelがapp=sample-appであるPodが動いているNode(raspi003)で、kubernetes.io/hostnameが同じNode(raspi003)」

これにより、raspi003が選ばれるはずです。

```console
pi@raspi001:~/tmp $ k apply -f sample-pod-affinity-arch.yaml
pi@raspi001:~/tmp $ k get pods sample-pod-affinity-arch -o wide
NAME                       READY   STATUS              RESTARTS   AGE   IP       NODE       NOMINATED NODE   READINESS GATES
sample-pod-affinity-arch   0/1     ContainerCreating   0          13s   <none>   raspi003   <none>           <none>
```

期待通りraspi003で動いていますね。

# Inter-Pod Anti-Affinity
Inter-Pod Affinityの否定形です。以上。

今まで紹介したAffinity、AntiAffinity,Inter-Pod Affinity, Inter-Pod AntiAffinityは、組み合わせることができます。

# Taints
Nodeに対して汚れをつけていきます。汚れたNodeに対して、許容するPodのみがスケジューリングできるようになります。

汚れの種類(Effect)は、３つあります。

* PreferNoSchedule
    * 可能な限りスケジューリングしない
* NoSchedule
    * スケジューリングしない（既にスケジューリングされているPodはそのまま）
* NoExecute
    * 実行を許可しない（既にスケジューリングされているPodは停止される）

それでは、まずNodeを汚しましょう。

```console
pi@raspi001:~/tmp $ k taint node raspi003 env=prd:NoSchedule
pi@raspi001:~/tmp $ k describe node raspi003 | grep Taints
Taints:             env=prd:NoSchedule
```

これでraspi003にPodをスケジューリングできなくなりました。

# Tolerations
さきほど汚したNodeに対して、許容(Tolerations)できるPodを作成しましょう。

keyとvalue(env=prd)とEffect(NoSchedule)が設定されたPodのみ許容されます。作ってみます。

```yaml
# sample-tolerations.yaml
apiVersion: v1
kind: Pod
metadata:
  name: sample-tolerations
spec:
  containers:
    - name: nginx-container
      image: nginx:1.12
  tolerations:
  - key: "env"
    operator: "Equal"
    value: "prd"
    effect: "NoSchedule"
  nodeSelector:
    disksize: "300"
```

※ nodeSelectorで汚れたNodeであるraspi003を指定するようにしています。

operatorには、2種類あります。

* Equal
    * keyとvalueが等しい
* Exists
    * keyが存在する

では、適用してみます。

```console
pi@raspi001:~/tmp $ k apply -f sample-tolerations.yaml
pi@raspi001:~/tmp $ k get pod sample-tolerations -o=wide
NAME                 READY   STATUS    RESTARTS   AGE   IP             NODE       NOMINATED NODE   READINESS GATES
sample-tolerations   1/1     Running   0          27s   10.244.2.140   raspi003   <none>           <none>
```

汚れたNodeに許容されるPodが適用されましたね。
許容を一部変えてみる(env=stg)と、もちろんPendingになりました。

もとに戻しておきます。

```console
pi@raspi001:~/tmp $ k taint node raspi003 env-
```

# お片付け

```console
pi@raspi001:~/tmp $ k delete -f sample-nodeselector.yaml -f sample-node-affinity.yaml -f sample-pod-affinity-host.yaml -f sample-pod-affinity-arch.yaml -f sample-tolerations.yaml
pi@raspi001:~/tmp $ k label node raspi002 cputype- disksize-
pi@raspi001:~/tmp $ k label node raspi003 cputype- disksize-
```

# 最後に
PodをどのNodeにスケジューリングするのか学習しました。
汚れ(taint)と許容(tolerations)という考えは面白いなと思いました。
ただ、あまり使いすぎると複雑に陥りやすそうなので、注意が必要ですね。
次回は、[こちら](https://qiita.com/silverbirder/items/8ea729949ab3bb4cf540)です。
