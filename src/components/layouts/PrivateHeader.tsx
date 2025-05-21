import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import Setting from "./Setting";
import { auth } from "@/auth";

const PrivateHeader = async () => {
  const session = await auth();
  if (!session?.user?.email) throw new Error("不正なリクエストです");

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="mx-auto px-4 py-4 flex items-center justify-between">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link
                href={"/dashboard"}
                className="font-bold text-xl whitespace-pre text-slate-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                MyTechBlog - 管理ページ
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Setting session={session} />
      </div>
    </header>
  );
};

export default PrivateHeader;
