# MyTechBlog

技術記事を投稿・管理できる個人用のブログサイトです。
記事の閲覧・作成・編集・削除が可能です。

## 本番環境

[https://my-tech-blog-nine.vercel.app](https://my-tech-blog-nine.vercel.app)

## 主な機能

- 記事一覧・詳細の閲覧（ログイン不要）
- 記事の作成・編集・削除（ログイン後）

## 使用技術

- 開発言語：TypeScript
- フレームワーク：Next.js
- データベース：PostgreSQL（Supabase）
- 認証：Auth.js
- ORM：Prisma
- UI：shadcn/ui
- デプロイ：Vercel

## ローカルセットアップ方法

```bash
git clone https://github.com/m-bitterC2/my-tech-blog.git
cd my-tech-blog
npm install
npx prisma migrate dev
npx prisma generate
npm run dev
```

## 今後の改善点

- サイト全体のコンセプトづくり
- ダークモード対応
- レスポンシブ対応
- カテゴリによる記事分類
