<!-- 
title: Mac で バ美肉 りたい！  (Zoom + Gachikoe + 3Tene or Reality)
date: 2020-03-08T17:56:07+09:00
draft: false
description: description
image: 
icon: 😎
-->

![バ美肉](https://cdn-ak.f.st-hatena.com/images/fotolife/s/silverbirder180/20200308/20200308172732.png)

[:contents]

# きっかけ

みなさん、リモートワーク（テレワーク）してますか？
Hangouts MeetやZoomといったビデオ会議ツールを使う機会が増えたと思います。

そんな中、次の記事が流行りました。

[https://level69.net/archives/26902:embed]

> バ美肉（バびにく）とは、バーチャル美少女受肉またはバーチャル美少女セルフ受肉の略語

>[https://ja.wikipedia.org/wiki/バ美肉:embed]

これにより、ビデオ会議(例はZoom)で、次のようなバーチャル美少女 (になりきった私)が参加できるようになります。もちろん、声もボイスチェンジできます。

<figure title="バーチャル美少女 (私)">
<img alt="バーチャル美少女 (私)" src="https://cdn-ak.f.st-hatena.com/images/fotolife/s/silverbirder180/20200308/20200308101851.png">
<figcaption>バーチャル美少女 (私)</figcaption>
</figure>

<figure title="Whiteboard in Zoom">
<img alt="Whiteboard in Zoom" src="https://cdn-ak.f.st-hatena.com/images/fotolife/s/silverbirder180/20200308/20200308173549.png">
<figcaption>Whiteboard in Zoom</figcaption>
</figure>

Windowsでは、[Facerig](https://store.steampowered.com/app/274920/FaceRig/?l=japanese)というアプリで簡単に構築できるみたいです。

これを Mac で構築する方法を紹介しようと思います。
Mac + Bootcamp → Windows10 + Facering  でもできると思いますが、動作不安定になる可能性があったため、極力避けようと思い、却下しました。

# 構成

私は、次のような構成になりました。

<figure title="バ美肉's structure">
<img alt="バ美肉's structure" src="https://cdn-ak.f.st-hatena.com/images/fotolife/s/silverbirder180/20200308/20200308123745.png">
<figcaption>バ美肉's structure</figcaption>
</figure>

音声と動画の2つに分かれます。
また、ビデオ会議ツールと連携するため、仮想デバイス(Soundflower, CamTwist)が必要になります。

# 音声
## Voice Changer: Gachikoe

野太い声じゃなくて、かわいい声が聞きたいですよね。そうですよね。はい。  

[Gachikoe](https://booth.pm/ja/items/1236505)を使いました。

Gachikoeは、次のような設定にしました。

<figure title="Gachikoe">
<img alt="Gachikoe" src="https://cdn-ak.f.st-hatena.com/images/fotolife/s/silverbirder180/20200308/20200308171514.png">
<figcaption>Gachikoe</figcaption>
</figure>

<figure title="Gachikoe settings">
<img alt="Gachikoe settings" src="https://cdn-ak.f.st-hatena.com/images/fotolife/s/silverbirder180/20200308/20200308171539.png">
<figcaption>Gachikoe settings</figcaption>
</figure>

Outputを soundflower (2ch)にしています。

## 仮想マイク

仮想マイクは、Soundflowerを使います。
[https://github.com/mattingalls/Soundflower/tags:embed]

音声出力のルーティングを制御するために、LadioCastも使いました。
[https://apps.apple.com/jp/app/ladiocast/id411213048?mt=12:embed]

LadioCastは、次のような設定にしました。

<figure title="LadioCast">
<img alt="LadioCast" src="https://cdn-ak.f.st-hatena.com/images/fotolife/s/silverbirder180/20200308/20200308171630.png">
<figcaption>LadioCast</figcaption>
</figure>

Inputを soundflower (2ch)とし、Outputを soundflower (64ch)としています。

# 動画
## Application for VTuber
### Desktop: 3tene
デスクトップで動かす場合は、3tene(ミテネ)を使いました。

[https://3tene.com/:embed]

3teneは、特に設定は必要ありません。
撮影前には、Webカメラとリップシンク(口の動きの同期)を起動しておきましょう。

<figure title="3tene">
<img alt="3tene" src="https://cdn-ak.f.st-hatena.com/images/fotolife/s/silverbirder180/20200308/20200308171751.png">
<figcaption>3tene</figcaption>
</figure>


#### Asserts
肝心のキャラクターですが、3teneはVRM形式でなければならないそうです。(よくわかっていません)  
私は、次のサイトでダウンロードしました。

[https://hub.vroid.com/:embed]

[https://3d.nicovideo.jp/:embed]

### Mobile: Reality
モバイルで動かす場合は、Realityを使いました。

[https://apps.apple.com/jp/app/reality-%E3%83%90%E3%83%BC%E3%83%81%E3%83%A3%E3%83%AB%E3%83%A9%E3%82%A4%E3%83%96%E9%85%8D%E4%BF%A1%E3%82%A2%E3%83%97%E3%83%AA/id1404176564:embed]

Realityは、特に設定は必要ありません。
好みのキャラクターをカスタマイズして簡単に作れます。

私は、これです。
<figure title="reality me">
<img alt="reality me" src="https://cdn-ak.f.st-hatena.com/images/fotolife/s/silverbirder180/20200308/20200308135013.jpg">
<figcaption><a href="https://reality.wrightflyer.net/profile/443e9213">reality me</a></figcaption>
</figure>

iPhoneで撮影している画面をMacに反映する必要があります。
MacとiPhoneを接続し、QuickTime Playerへ出力します。こんな感じです。

<figure title="iPhone To QuickTime Player">
<img alt="iPhone To QuickTime Player" src="https://cdn-ak.f.st-hatena.com/images/fotolife/s/silverbirder180/20200308/20200308172222.png">
<figcaption>iPhone To QuickTime Player</figcaption>
</figure>

noneは、私のiPhoneデバイス名です。

## 仮想カメラ

CamTwistという仮想カメラを使いました。
[http://camtwiststudio.com/download/:embed]

CamTwistは、次のような設定にしました。

<figure title="CamTwist">
<img alt="CamTwist" src="https://cdn-ak.f.st-hatena.com/images/fotolife/s/silverbirder180/20200308/20200308172329.png">
<figcaption>CamTwist</figcaption>
</figure>

例では、QuickTime Playerのアプリケーションを選択しています。3teneの場合は、3teneの選択肢を選択すれば良いです。

# 使い方 (Zoom)

今まで説明したものを起動した状態で、Zoomを起動します。
Zoomは、次のような設定にしました。

<figure title="Zoom > Settings > Video">
<img alt="Zoom > Settings > Video" src="https://cdn-ak.f.st-hatena.com/images/fotolife/s/silverbirder180/20200308/20200308174057.png">
<figcaption>Zoom > Settings > Video</figcaption>
</figure>

動画は、CamTwistから取得するようにします。

<figure title="Zoom > Settings > Audio">
<img alt="Zoom > Settings > Audio" src="https://cdn-ak.f.st-hatena.com/images/fotolife/s/silverbirder180/20200308/20200308174235.png">
<figcaption>Zoom > Settings > Audio</figcaption>
</figure>

音声は、Soundeflower (64ch)から取得するようにします。

これで、<b>Mac で バ美肉 することができました！</b>

# 終わりに
テレビ会議で、こういった "リアルな姿を出さず、異なる人物を出す" のは、実際役立つものなのでしょうか。
テレビ会議ツール、例えばZoomでは、音声や動画を隠せる機能はあります。
"リアルな姿を隠したい"要求は、すでに解決できています。

今回のような"バ美肉"って、どういうメリットがあるのか、んーってなりました。
ネタ的には『可愛い女の子と会話すると、生産性があがる』なのですが...脳が震える。

# 参考リンク

[https://kumak1.hatenablog.com/entry/2018/09/27/234203:embed]

[http://kuroyam.hatenablog.com/entry/2020/02/27/204246:embed]

[https://mzyy94.com/blog/2020/02/25/virtual-bishoujo-meeting/:embed]

[https://www.excite.co.jp/news/article/MoguraVR_voice-changer-pickup5/:embed]

[https://www.cg-method.com/entry/gachikoe/#Gachikoe:embed]

[https://vtuberkaibougaku.site/2019/01/31/post-3176/:embed]
