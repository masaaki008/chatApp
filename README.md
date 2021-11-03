# 会社技術発表用アプリ
# 使い方
## npm グローバルインストールリスト
```
├── @ionic/cli@6.18.0
├── @vue/cli@4.5.15
├── eslint@7.32.0
├── firebase-tools@9.18.0
├── formidable@3.1.3
├── npm@8.1.2
├── typescript@4.4.3
└── yarn@1.22.11
```

## サーバー起動まで手順
- ```
  # firebaseにログイン、以下コマンド後手順通り進める
  firebase login
  ```

- ```
  # gitから取得
  git clone https://github.com/masaaki008/chatApp.git
  cd chatApp
  ```

- ```
  # モジュールインストール
  npm i
  ```

- ```
  # firebaseの初期設定を行う
  fibase init
  ```

- ```
  # 実行
  ionic serve
  ```
  
- ```
  # build
  ionic build
  ```
