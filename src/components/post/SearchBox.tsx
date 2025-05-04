"use client";

import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBox() {
  // 入力フィールドの現在の値
  const [search, setSearch] = useState("");

  // デバウンスされた検索ワード（500ms静止後に反映）
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  // 入力後500ms静止してから検索語を反映（＝デバウンス処理）
  useEffect(() => {
    const timer = setTimeout(() => {
      // 前後の空白を除去して保存
      setDebouncedSearch(search.trim());
    }, 500);

    // 次の入力があれば前のタイマーをキャンセル
    return () => clearTimeout(timer);
  }, [search]);

  // デバウンス後の検索語が変化したらURLのクエリパラメータを更新
  useEffect(() => {
    // 現在のURLのsearchパラメータを取得（未設定なら空文字）
    const currentSearch = searchParams.get("search") || "";

    if (debouncedSearch && debouncedSearch !== currentSearch) {
      // 検索語が存在し、現在のURLと異なる場合にクエリを更新
      router.push(`/?search=${debouncedSearch}`);
    } else if (!debouncedSearch && currentSearch) {
      // 検索語が空になった場合はクエリをリセット（トップに戻る）
      router.push("/");
    }
  }, [debouncedSearch, router, searchParams]);

  return (
    <Input
      placeholder="記事を検索..."
      className="w-[200px] lg:w-[300px] bg-white"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
