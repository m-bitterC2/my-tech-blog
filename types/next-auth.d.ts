import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    /** データベースモデル上の userName */
    userName: string;
  }

  interface Session {
    user: DefaultSession["user"] & {
      /** セッションで返したいユーザー名 */
      userName: string;
    };
  }
}
