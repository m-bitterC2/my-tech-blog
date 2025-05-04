// 仮のユーザーパスワード（ハッシュ化して保存する）
const DUMMY_PASSWORD = "password123";

// ダミー画像のURL（投稿のトップ画像として使用）
const DUMMY_IMAGES = [
  "https://picsum.photos/seed/post1/600/400",
  "https://picsum.photos/seed/post2/600/400",
];

// 作成するユーザー情報（メールアドレスとユーザー名）
const USER_DATA = {
  email: "test@example.com",
  userName: "nanashi",
};

// 作成する投稿データ（2件）
const POST_DATA = [
  {
    title: "Prismaとは",
    content: "TypeScript 向けの ORM（Object-Relational Mapping）",
    topImage: DUMMY_IMAGES[0],
    published: true,
  },
  {
    title: "Next.js の Server Actions について",
    content: "Server Actions を使うメリットを解説します！",
    topImage: DUMMY_IMAGES[1],
    published: true,
  },
];

module.exports = {
  DUMMY_PASSWORD,
  USER_DATA,
  POST_DATA,
};
