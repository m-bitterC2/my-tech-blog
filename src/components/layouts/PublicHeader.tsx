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

const PublicHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <header className="border-b bg-blue-200">
        <div className="mx-auto px-4 py-4 flex items-center justify-between">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href={"/"} className="font-bold text-xl">
                  MyTechBlog
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* PC用メニュー（md以上で表示） */}
          <nav className="hidden md:flex items-center gap-4">
            <SearchBox />
            <Button variant="outline" asChild>
              <Link href="/login">ログイン</Link>
            </Button>
            <Button variant="outline" asChild>
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
                <Button variant="outline" asChild>
                  <Link href="/login">ログイン</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/register">登録</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </Suspense>
  );
};

export default PublicHeader;
