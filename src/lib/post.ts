import { prisma } from "./prisma";

export const getPosts = () => {
  return prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          userName: true,
        },
      },
    },
  });
};

export const getPost = (id: string) => {
  return prisma.post.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          userName: true,
        },
      },
    },
  });
};

export async function searchPosts(search: string) {
  // URLエンコードされた文字列をデコード
  // （例: "React%20Hooks" → "React Hooks"）
  const decodedSearch = decodeURIComponent(search);

  // 全角スペースや連続したスペースを半角スペース1つに正規化し、前後の空白も除去
  // （例: " React　Hooks " → "React Hooks"）
  const normalizedSearch = decodedSearch.replace(/[\s　]+/g, " ").trim();

  // スペースで単語に分割し、空文字を除去
  // （例: "React Hooks" → ["React", "Hooks"]）
  const searchWords = normalizedSearch.split(" ").filter(Boolean);

  // 各単語に対して「タイトルまたは本文にその単語を含む」という条件を作成
  const filters = searchWords.map((word) => ({
    OR: [{ title: { contains: word } }, { content: { contains: word } }],
  }));

  // Prismaを使って投稿を検索
  // - すべての検索ワードに一致する投稿を取得（AND条件）
  // - 投稿日時が新しい順にソート
  // - 投稿の著者名（userName）のみを含める
  return await prisma.post.findMany({
    where: { AND: filters },
    orderBy: { createdAt: "desc" },
    include: {
      author: {
        select: {
          userName: true,
        },
      },
    },
  });
}
