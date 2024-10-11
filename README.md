# Google Login Frontend with Next.js

このプロジェクトは、Next.jsを使用して構築されたフロントエンドアプリケーションで、ユーザーがGoogleログインを通して認証する機能を備えています。このアプリケーションは、バックエンドと連携してGoogleトークンの取得と検証を行い、認証を完了させます。

## 機能

- Googleログインによる認証
- 認証トークンのバックエンド送信と検証
- ログインしたユーザーのデータの取得

## 関連リポジトリ

- [バックエンドリポジトリ](https://github.com/Tsubasa-2005/GoogleAuthAPI) - Google認証を処理するGoで構築されたバックエンドAPI。

## セットアップ

1. **リポジトリをクローン**:

   ```
   git clone https://github.com/Tsubasa-2005/google-auth.git
   cd google-auth
   ```

2. **依存関係のインストール**:

   ```
   npm install
   ```

3. **環境変数の設定**:

   プロジェクトルートに `.env.local` ファイルを作成し、以下の変数を設定します。

   ```
   GOOGLE_CLIENT_ID=<Google OAuth2 クライアントID>
    GOOGLE_CLIENT_SECRET=<Google OAuth2 クライアントシークレット>
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=<NextAuthのシークレット>
   ```

4. **アプリケーションの実行**:

   ```
   npm run dev
   ```

   ローカルサーバーは `http://localhost:3000` で起動します。
