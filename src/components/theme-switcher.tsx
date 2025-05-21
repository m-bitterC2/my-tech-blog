"use client";

import { useTheme } from "./theme-provider";
import { Moon, Sun, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // コンポーネントがマウントされたときだけレンダリングする
  useEffect(() => {
    setMounted(true);
  }, []);

  // マウントされるまではなにも表示しない
  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <button
        className={`p-2 rounded-lg ${
          theme === "light"
            ? "bg-secondary text-secondary-foreground"
            : "hover:bg-secondary/80"
        }`}
        onClick={() => setTheme("light")}
        aria-label="ライトモード"
      >
        <Sun className="h-5 w-5" />
      </button>
      <button
        className={`p-2 rounded-lg ${
          theme === "dark"
            ? "bg-secondary text-secondary-foreground"
            : "hover:bg-secondary/80"
        }`}
        onClick={() => setTheme("dark")}
        aria-label="ダークモード"
      >
        <Moon className="h-5 w-5" />
      </button>
      <button
        className={`p-2 rounded-lg ${
          theme === "system"
            ? "bg-secondary text-secondary-foreground"
            : "hover:bg-secondary/80"
        }`}
        onClick={() => setTheme("system")}
        aria-label="システム設定に合わせる"
      >
        <Monitor className="h-5 w-5" />
      </button>
    </div>
  );
}
