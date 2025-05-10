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
    <header className="border-b bg-blue-200">
      <div className="mx-auto px-4 py-4 flex items-center justify-between">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link
                href={"/dashboard"}
                className="font-bold text-xl whitespace-pre"
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
