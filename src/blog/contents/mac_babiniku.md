<!-- 
title: Mac で バ美肉 りたい！  (Zoom + Gachikoe + 3Tene or Reality)
date: 2020-03-08T17:56:07+09:00
draft: false
description: description
image: 
icon: 😎
-->
# Links
https://silverbirder180.hatenablog.com/entry/2020/03/08/175607

[f:id:silverbirder180:20200308172732p:plain]

[:contents]

# きっかけ

みなさん、リモートワーク（テレワーク）してますか？
Hangouts MeetやZoomといったビデオ会議ツールを使う機会が増えたと思います。

そんな中、次の記事が流行りました。
[https://level69.net/archives/26902:embed]

> バ美肉（バびにく）とは、バーチャル美少女受肉またはバーチャル美少女セルフ受肉の略語
[https://ja.wikipedia.org/wiki/バ美肉:embed]

これにより、ビデオ会議(例はZoom)で、次のようなバーチャル美少女 (になりきった私)が参加できるようになります。もちろん、声もボイスチェンジできます。
<figure title="バーチャル美少女 (私)">[f:id:silverbirder180:20200308101851p:plain]<figcaption>バーチャル美少女 (私)</figcaption></figure>
<figure title="Whiteboard in Zoom">[f:id:silverbirder180:20200308173549p:plain]<figcaption>Whiteboard in Zoom</figcaption></figure>

Windowsでは、[Facerig](https://store.steampowered.com/app/274920/FaceRig/?l=japanese)というアプリで簡単に構築できるみたいです。

これを Mac で構築する方法を紹介しようと思います。
Mac + Bootcamp → Windows10 + Facering  でもできると思いますが、動作不安定になる可能性があったため、極力避けようと思い、却下しました。

# 構成

私は、次のような構成になりました。

<figure title="&quot;バ美肉&quot; &#x27;s structure">[f:id:silverbirder180:20200308123745p:plain]<figcaption>&quot;バ美肉&quot; &#x27;s structure</figcaption></figure>

音声と動画の2つに分かれます。
また、ビデオ会議ツールと連携するため、仮想デバイス(Soundflower, CamTwist)が必要になります。

# 音声
## Voice Changer: Gachikoe

野太い声じゃなくて、かわいい声が聞きたいですよね。そうですよね。はい。  

Gachikoeを使いました。
[https://booth.pm/ja/items/1236505:embed]

Gachikoeは、次のような設定にしました。

<figure title="Gachikoe">[f:id:silverbirder180:20200308171514p:plain]<figcaption>Gachikoe</figcaption></figure>
<figure title="Gachikoe settings">[f:id:silverbirder180:20200308171539p:plain]<figcaption>Gachikoe settings</figcaption></figure>

Outputを soundflower (2ch)にしています。

## 仮想マイク

仮想マイクは、Soundflowerを使います。
[https://github.com/mattingalls/Soundflower/tags:embed]

音声出力のルーティングを制御するために、LadioCastも使いました。
[https://apps.apple.com/jp/app/ladiocast/id411213048?mt=12:embed]

LadioCastは、次のような設定にしました。

<figure title="LadioCast">[f:id:silverbirder180:20200308171630p:plain]<figcaption>LadioCast</figcaption></figure>

Inputを soundflower (2ch)とし、Outputを soundflower (64ch)としています。

# 動画
## Application for VTuber
### Desktop: 3tene
デスクトップで動かす場合は、3tene(ミテネ)を使いました。

[https://3tene.com/:embed]

3teneは、特に設定は必要ありません。
撮影前には、Webカメラとリップシンク(口の動きの同期)を起動しておきましょう。

<figure title="3tene">[f:id:silverbirder180:20200308171751p:plain]<figcaption>3tene</figcaption></figure>


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
<figure title="https://reality.wrightflyer.net/profile/443e9213">[f:id:silverbirder180:20200308135013j:plain]<figcaption>https://reality.wrightflyer.net/profile/443e9213</figcaption></figure>

iPhoneで撮影している画面をMacに反映する必要があります。
MacとiPhoneを接続し、QuickTime Playerへ出力します。こんな感じです。

<figure title="iPhone To QuickTime Player">[f:id:silverbirder180:20200308172222p:plain]<figcaption>iPhone To QuickTime Player</figcaption></figure>

noneは、私のiPhoneデバイス名です。

## 仮想カメラ

CamTwistという仮想カメラを使いました。
[http://camtwiststudio.com/download/:embed]

CamTwistは、次のような設定にしました。

<figure title="CamTwist">[f:id:silverbirder180:20200308172329p:plain]<figcaption>CamTwist</figcaption></figure>
例では、QuickTime Playerのアプリケーションを選択しています。3teneの場合は、3teneの選択肢を選択すれば良いです。

# 使い方 (Zoom)

今まで説明したものを起動した状態で、Zoomを起動します。
Zoomは、次のような設定にしました。

<figure title="Zoom &gt; Settings &gt; Video">[f:id:silverbirder180:20200308174057p:plain]<figcaption>Zoom &gt; Settings &gt; Video</figcaption></figure>

動画は、CamTwistから取得するようにします。

<figure title="Zoom &gt; Settings &gt; Audio">[f:id:silverbirder180:20200308174235p:plain]<figcaption>Zoom &gt; Settings &gt; Audio</figcaption></figure>

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
