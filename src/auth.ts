import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "./lib/prisma";
import bcryptjs from "bcryptjs";

async function getUser(email: string) {
  // ユーザー取得関数
  return await prisma.user.findUnique({
    where: { email },
  });
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // 認証ロジックを実装する
      async authorize(credentials) {
        // Zod で入力値チェック
        const parsed = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .safeParse(credentials);
        if (!parsed.success) return null; // バリデーション失敗

        const { email, password } = parsed.data;
        const user = await getUser(email); // DB からユーザー取得
        if (!user) return null;

        // bcrypt でパスワード比較
        const match = await bcryptjs.compare(password, user.password);
        if (!match) return null;

        return user; // 認証成功であればユーザー情報を返す
      },
    }),
  ],
});
