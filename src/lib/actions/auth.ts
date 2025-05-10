"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    redirect("/dashboard");
  } catch (error) {
    if (error instanceof AuthError) {
      console.log("error.cause: ", error.cause);
      console.log("error.message", error.message);
      console.log("error.name", error.name);
      console.log("error.stack", error.stack);
      switch (error.name) {
        case "CredentialsSignin":
          return "メールアドレスまたはパスワードが正しくありません。";
        default:
          return "エラーが発生しました。";
      }
    }
    throw error;
  }
}
