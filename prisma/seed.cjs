// Prisma Client を読み込む（Prisma を使って DB にアクセスするためのライブラリ）
const { PrismaClient } = require("@prisma/client");

// パスワードをハッシュ化するためのライブラリ（bcryptjs）
const bcrypt = require("bcryptjs");

// ダミーデータ
const { DUMMY_PASSWORD, USER_DATA, POST_DATA } = require("./data/dummyData");

const prisma = new PrismaClient(); // Prisma Client インスタンス

async function seed() {
  // 既存データを削除（クリーンアップ）
  await prisma.post.deleteMany(); // 投稿データを全削除
  await prisma.user.deleteMany(); // ユーザーデータを全削除

  // パスワードをハッシュ化
  const hashedPassword = await bcrypt.hash(DUMMY_PASSWORD, 12);

  // ユーザー＋投稿を一括作成
  const user = await prisma.user.create({
    data: {
      ...USER_DATA,
      password: hashedPassword,
      posts: {
        create: POST_DATA,
      },
    },
  });

  console.log("Seeded user:", user);
}

seed()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1); // 終了コード1でプロセス終了
  })
  .finally(async () => {
    await prisma.$disconnect(); // Prisma クライアントを閉じる（リソース解放）
  });
