import { AdapterUser } from "@auth/prisma-adapter";

declare module "next-auth/adapters" {
  interface AdapterUser {
    /** DB にある自前のユーザー名 */
    userName: string;
  }
}
