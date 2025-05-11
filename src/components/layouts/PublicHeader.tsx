import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Button } from "../ui/button";
import SearchBox from "../post/SearchBox";
import { Suspense } from "react";

const PublicHeader = () => {
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

          <div className="flex items-center gap-4">
            <SearchBox />
            <Button variant="outline" asChild>
              <Link href="/login">ログイン</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/register">登録</Link>
            </Button>
          </div>
        </div>
      </header>
    </Suspense>
  );
};

export default PublicHeader;
