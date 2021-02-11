<!-- 
title: 一足遅れて Kubernetes を学び始める - 03. Raspberry Pi -
date: 2019-04-28T00:00:00+09:00
draft: false
description: description
-->
# Links
https://qiita.com/silverbirder/items/cfaaba136b74b3140902

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
[一足遅れて Kubernetes を学び始める - 02. Docker For Mac -](https://qiita.com/silverbirder/items/d1aa368568885df2e44f)では、MacでKubernetesを軽く動かしてみました。DockerForMacでは、NodeがMasterのみだったため、Kubernetesを学習するには、ものたりない感がありました。そこで、RaspberryPiを使っておうちKubernetesを構築することになりました。 


@go_vargoさんの[Raspberry PiでおうちKubernetes構築【物理編】](https://qiita.com/go_vargo/items/d1271ab60f2bba375dcc), [Raspberry PiでおうちKubernetes構築【論理編】](https://qiita.com/go_vargo/items/29f6d832ea0a289b4778)をベースに進めていきます。

他、参考サイト

* [ラズパイでKubernetesクラスタを構築する](https://qiita.com/sotoiwa/items/e350579d4c81c4a65260)
* [おうちKubernetes構築でハマったところ - ニッチ編 -](https://qiita.com/shnmorimoto/items/7ce3c3ef8e962f8e5c59)
* [おうちkubernetesでデータを永続化する](https://qiita.com/inajob/items/7b61904586d0816dfe5f)
* [kubernetesのラズパイ包みが美味しそうだったので、kubeadmを使って作ってみた](https://qiita.com/shirot61/items/2321b70cd9c93f8f5cf0)
* [Raspberry PI と kubeadm で自宅 Kubernetes クラスタを構築する](https://qiita.com/hatotaka/items/48a88ecb190e1f5e03c3)
* [3日間クッキング【Kubernetes のラズペリーパイ包み　“サイバーエージェント風”】](https://developers.cyberagent.co.jp/blog/archives/14721/)
* [33時間クッキング【Kubernetesのラズベリーパイ包み〜ウエパ風〜】](https://engineers.weddingpark.co.jp/?p=1993)

# レシピ

|商品名|個数|用途|
|---|---|---|
|[Raspberry Pi 3 Model B](https://www.amazon.co.jp/gp/product/B01NAHBSUD/)|3つ|MasterNode1台<br>WorkerNode2台|
|[microSDHCカード 16GB](https://www.amazon.co.jp/gp/product/B079H6PDCK/)|3枚|RaspberryPiのimage書き込み先|
|[LANケーブル](https://www.amazon.co.jp/gp/product/B00JEUSAR2)|1本|RaspberryPiとネットワーク接続|
|[USB充電器](https://www.amazon.co.jp/gp/product/B01AVSNEFS/)|1台|RaspberryPiの電源|
|[Micro USBケーブル](https://www.amazon.co.jp/gp/product/B07K3WGLV7/)|4本|RaspberryPiとUSB充電器をつなげる|
|[for Raspberry Pi ケース 専用 4段](https://www.amazon.co.jp/gp/product/B01JONA3U0/) <br> ヒートシンク付|1台|4段<br>(3:RaspberryPi,1:USB充電器)|

RaspberryPiは世代3のModelBならWiFi接続できるので、自宅のWiFiにつなげることにしました。自宅ではSoftbankAirを使っています。
（ただし、初回のみLANケーブルでネットワーク接続します)

また、私の環境は下記のとおりです。

```text:machine
iMac (21.5-inch, 2017)
```

# 構築（物理）
[Raspberry PiでおうちKubernetes構築【物理編】](https://qiita.com/go_vargo/items/d1271ab60f2bba375dcc)で十分な情報があります。こちらを参考にして組み立てします。
できたものがこちらです。
![kubernetes_raspberrypi.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/143813/72661091-1ffa-a9da-76dc-68c53b0f5b39.png)

WiFiを使うために、LANケーブルやWiFi親機などがなくなり、スッキリしました。
電源を確保できるところであれば、家の中なら、どこでも持ち運びできます。 :sparkles: 

# 構築（論理）
[Raspbian Stretch Lite](https://www.raspberrypi.org/downloads/raspbian/)をダウンロードしておきます。
`2019-04-08-raspbian-stretch-lite.img`

Stepの1から3までの手順を**RaspberryPi一台ずつ** 、下記の手続きを踏んでいきます。

## 1. 初期設定
microSDカードをMacにつなげた後に、下記を実施します。

```shell
$ diskutil list
$ sudo diskutil umount /dev/disk3s1
$ sudo dd bs=1m if=2019-04-08-raspbian-stretch-lite.img of=/dev/rdisk3 conv=sync
$ cd /Volumes/boot
$ touch ssh
$ vim cmdline.txt
# 下記を末尾に追記
cgroup_enable=cpuset cgroup_enable=memory cgroup_memory=1
```

イメージを書き込み際、**r** をつける (rdisk3)と、高速になるそうです。

## 2. RaspberryPiに接続
MicroSDカードをRaspbeeryPiに挿入し、電源をつけたら、下記を実施します。
LANケーブルは、自宅のWiFiに直接つなげます。(私の場合はSoftBankAir)

hostnameは、お好みの名前にします。（私は、`Master:raspi001, Worker:raspi002,raspi003`としました。)

```shell
$ slogin pi@raspberrypi.local
# 初回password「raspberry」
pi@raspbeerypi:~ $ sudo passwd pi
pi@raspbeerypi:~ $ sudo apt-get update && sudo apt-get -y upgrade && sudo apt-get install -y vim
pi@raspbeerypi:~ $ sudo vim /etc/hostname
pi@raspbeerypi:~ $ sudo sh -c 'wpa_passphrase <SSID> <PASSWORD> >> /etc/wpa_supplicant/wpa_supplicant.conf'
pi@raspbeerypi:~ $ sudo shutdown -r now
```
※ 2回目以降は、`ssh-keygen -R raspberrypi.local`をしましょう。

電源を落として、LANケーブルを外します。再度電源をつけて数分待ってから、下記を実施します。

```shell
$ slogin pi@raspi001.local
pi@raspi001:~ $ 
```

接続できたら成功です。

## 3. 各種インストール

おまじないをします。

```shell
pi@raspi001:~ $ sudo dphys-swapfile swapoff && sudo dphys-swapfile uninstall && sudo update-rc.d dphys-swapfile remove
```

Dockerをインストールします。

```shell
pi@raspi001:~ $　sudo apt-get install apt-transport-https ca-certificates curl software-properties-common -y
pi@raspi001:~ $　curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -
pi@raspi001:~ $　echo "deb [arch=armhf] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") \
     $(lsb_release -cs) stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list
pi@raspi001:~ $　sudo apt-get update -y
pi@raspi001:~ $　sudo apt-get install docker-ce -y
```

Kubernetesをインストールします。

```shell
pi@raspi001:~ $　curl -fsSL https://packages.cloud.google.com/apt/doc/apt-key.gpg|sudo apt-key add - 
pi@raspi001:~ $　echo "deb http://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kube.list
pi@raspi001:~ $　sudo apt-get update -y && sudo apt-get install kubelet kubeadm kubectl -y
```

## 4. MasterNodeの設定

MasterNodeにするRaspberryPiに対して下記を実施します。

```shell
pi@raspi001:~ $ sudo kubeadm init --pod-network-cidr=10.244.0.0/16
pi@raspi001:~ $ mkdir -p $HOME/.kube
pi@raspi001:~ $ sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
pi@raspi001:~ $ sudo chown $(id -u):$(id -g) $HOME/.kube/config
```
出力されるjoinメッセージをメモしておき、WorkerNodeの構築時に使います。

[こちら](https://kubernetes.io/docs/setup/independent/create-cluster-kubeadm/#pod-network)に従い下記を実行します。

```shell
pi@raspi001:~ $ kubectl apply -f https://raw.githubusercontent.com/coreos/flannel/a70459be0084506e4ec919aa1c114638878db11b/Documentation/kube-flannel.yml
pi@raspi001:~ $ kubectl get pods --all-namespaces
NAMESPACE     NAME                               READY   STATUS              RESTARTS   AGE
kube-system   coredns-fb8b8dccf-lglcr            0/1     ContainerCreating   0          4d16h
kube-system   coredns-fb8b8dccf-snt7d            0/1     ContainerCreating   0          4d16h
...
```

## 5. WorkerNodeの設定

MasterNodeから出力されたjoinコマンドを実施します。

```shell
pi@raspi002 $ kubeadm join 192.168.3.32:6443 --token X \
    --discovery-token-ca-cert-hash sha256:X
```

## 6. MasterNodeから確認

Nodeが増えているか確認します。

```shell
pi@raspi001:~ $ kubectl get nodes
NAME       STATUS   ROLES    AGE   VERSION
raspi001   Ready    master   65m   v1.14.1
raspi002   Ready    <none>   18m   v1.14.1
raspi002   Ready    <none>   18m   v1.14.1
pi@raspi001:~ $ kubectl label node raspi002 node-role.kubernetes.io/worker=worker
pi@raspi001:~ $ kubectl label node raspi003 node-role.kubernetes.io/worker=worker
pi@raspi001:~ $ kubectl get nodes
NAME       STATUS   ROLES    AGE   VERSION
raspi001   Ready    master   65m   v1.14.1
raspi002   Ready    worker   37m   v1.14.1
raspi003   Ready    worker   37m   v1.14.1
```

## 7. ブラウザから確認
試しにデプロイ→サービス公開→ブラウザ確認までを、さっと通してみます。

```shell
pi@raspi001:~ $ kubectl run nginx --image=nginx --replicas=1 --port=80
pi@raspi001:~ $ kubectl expose deployment nginx --port 80 --target-port 80 --type NodePort
pi@raspi001:~ $ kubectl get svc nginx
NAME    TYPE       CLUSTER-IP      EXTERNAL-IP   PORT(S)        AGE
nginx   NodePort   10.99.227.194   <none>        80:30783/TCP   17m
```
サービス公開までしたので、アクセスしてみます。

内部

```shell
pi@raspi001:~ $ curl http://10.99.227.194:80
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
</body>
```

外部

```shell
pi@raspi001:~ $ ifconfig
...
wlan0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.3.32  netmask 255.255.255.0  broadcast 192.168.3.255
```

`http://192.168.3.32:30783`にアクセス

![nginx](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/143813/f7bd2359-a988-28e4-b45b-c24aa9524452.png)

OK!

# お片付け

```shell
pi@raspi001:~ $ kubectl delete deployments nginx
deployment.extensions "nginx" deleted
pi@raspi001:~ $ kubectl  delete service nginx
service "nginx" deleted
```

# 完成
すんなりと構築することができました。これは先人たちの記事がたくさんあるので、
サクサクと進めることができました。これで、Kubernetesを使いまくります!! :muscle: :muscle: 
次回は[こちら](https://qiita.com/silverbirder/items/7ae773b6519b940b5be4)です。

