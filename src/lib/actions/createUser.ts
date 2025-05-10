"use server";

import { registerSchema } from "@/validation/user";
import { prisma } from "../prisma";
import bcryptjs from "bcryptjs";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import { ZodError } from "zod";

type ActionState = {
  success: boolean;
  errors: Record<string, string[]>;
};

function handleValidationError(error: ZodError): ActionState {
  const { fieldErrors, formErrors } = error.flatten();
  const castedFieldErrors = fieldErrors as Record<string, string[]>;

  // zodの仕様でパスワード一致確認のエラーは formErrorsで渡ってくる
  // formErrorsがある場合は、confirmPasswordフィールドにエラーを追加
  if (formErrors.length > 0) {
    return {
      success: false,
      errors: { ...fieldErrors, confirmPassword: formErrors },
    };
  }
  return { success: false, errors: castedFieldErrors };
}

// カスタムエラー処理
function handleError(customErrors: Record<string, string[]>): ActionState {
  return { success: false, errors: customErrors };
}

export const createUser = async (
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> => {
  // データ取得
  const rawFormData = Object.fromEntries(
    ["name", "email", "password", "confirmPassword"].map((field) => [
      field,
      formData.get(field) as string,
    ])
  ) as Record<string, string>;

  // バリデーション
  const validationResult = registerSchema.safeParse(rawFormData);
  if (!validationResult.success) {
    return handleValidationError(validationResult.error);
  }

  // DBチェック（メールアドレス）
  const existingUser = await prisma.user.findUnique({
    where: { email: rawFormData.email },
  });
  if (existingUser) {
    return handleError({
      email: ["このメールアドレスはすでに登録されています"],
    });
  }

  // パスワードのハッシュ化
  const hashedPassword = await bcryptjs.hash(rawFormData.password, 12);

  // DB登録
  await prisma.user.create({
    data: {
      userName: rawFormData.name,
      email: rawFormData.email,
      password: hashedPassword,
    },
  });

  // dashboardにリダイレクト
  await signIn("credentials", {
    ...Object.fromEntries(formData),
    redirect: false, // 自動リダイレクトを無効化
  });
  redirect("/dashboard");
};
