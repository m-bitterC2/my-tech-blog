import PostCard from "@/components/post/PostCard";
import { getPosts, searchPosts } from "@/lib/post";

type SearchParams = {
  search?: string;
};

const RootPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  // SearchBox の useRouter で設定したクエリ文字列（/?search=${debouncedSearch}）を取得する
  const query = (await searchParams).search || "";

  const posts = query ? await searchPosts(query) : await getPosts();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 
        container: 最大幅を設定し、左右に自動マージンで中央寄せ 
        mx-auto: 左右のマージンを自動（中央揃え）
        px-4: 左右に1rem（16px）のパディング
        py-8: 上下に2rem（32px）のパディング
      */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 
          grid: CSSグリッドレイアウトを使用
          grid-cols-1: モバイル（初期）では1列
          md:grid-cols-2: 画面幅768px以上（タブレット）では2列
          lg:grid-cols-3: 画面幅1024px以上（PC）では3列
          gap-6: 各グリッド項目間に1.5rem（24px）の間隔を設定
        */}

        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default RootPage;
