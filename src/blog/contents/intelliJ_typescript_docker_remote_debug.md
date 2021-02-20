<!-- 
title: IntelliJ + TypeScript + Docker で Remote Debug (Break Point)
date: 2019-12-28T00:00:00+09:00
draft: false
description: description
image: 
icon: 😎
-->

# TL;DR
1. Dockerコンテナ上で、 `ts-node-dev --inspect=0.0.0.0:9229 ./dist/index.js` を実行

![ts-node-dev](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/143813/0a9047b3-d803-be98-cf88-3de5d1ac9150.png)

2. IntelliJ上で、`Attach to Node.js/Chrome` を実行

`Run > Edit Configuration ... > +ボタン > Attach to Node.js/Chrome`

![Attach to Node.js/Chrome](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/143813/3d2d1df6-be89-482d-798e-cb1c71e83980.png)

3. IntelliJ上でBreakPointを貼り、ブラウザにアクセス

![IntelliJ Breakpoint](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/143813/c5774937-4e1c-8435-141c-7cca9a44f4ea.png)

※ Dockerコンテナでは、アプリ用ポート(8080)と、inspect用ポート(9229)を開放する必要あり

![8080と9229portの開放](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/143813/d663482a-6d9e-0e3a-695d-11e6fc1fb1c3.png)
