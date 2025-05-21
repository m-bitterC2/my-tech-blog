"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Button } from "../ui/button";
import SearchBox from "../post/SearchBox";
import { Suspense, useState } from "react";
import { Menu } from "lucide-react";
import { ThemeSwitcher } from "../theme-switcher";

const PublicHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="mx-auto px-4 py-4 flex items-center justify-between">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link
                  href={"/"}
                  className="font-bold text-xl text-slate-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
                >
                  MyTechBlog
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* PC用メニュー（md以上で表示） */}
          <nav className="hidden md:flex items-center gap-4">
            <ThemeSwitcher />
            <SearchBox />
            <Button
              className="text-slate-600 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
              variant="outline"
              asChild
            >
              <Link href="/login">ログイン</Link>
            </Button>
            <Button
              className="text-slate-600 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
              variant="outline"
              asChild
            >
              <Link href="/register">登録</Link>
            </Button>
          </nav>

          {/* モバイル用ハンバーガー（md未満で表示） */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label={open ? "メニューを閉じる" : "メニューを開く"}
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-2/4">
              <SheetTitle className="sr-only">メニュー</SheetTitle>
              <nav className="flex flex-col gap-4 mt-8 p-8">
                <Button
                  className="text-slate-600 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  variant="outline"
                  asChild
                >
                  <Link href="/login">ログイン</Link>
                </Button>
                <Button
                  className="text-slate-600 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
                  variant="outline"
                  asChild
                >
                  <Link href="/register">登録</Link>
                </Button>
                <ThemeSwitcher />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </Suspense>
  );
};

export default PublicHeader;
