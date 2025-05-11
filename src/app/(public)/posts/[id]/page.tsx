import { getPost } from "@/lib/post";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // コードハイライト用のスタイル

type Params = {
  params: Promise<{ id: string }>;
};

const PostPage = async ({ params }: Params) => {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/*
        container: コンテンツを中央寄せし、最大幅を制限（Tailwindのプリセット幅）
        mx-auto: 左右マージンを自動にして中央配置
        px-4: 左右に16pxのパディング
        py-8: 上下に32pxのパディング
      */}

      <Card className="max-w-3xl mx-auto pt-0">
        {/*
          max-w-3xl: カードの最大幅を768pxに制限（読みやすい幅）
          mx-auto: カード自体を中央に配置
        */}

        {post.topImage && (
          <div className="relative w-full h-64 lg:h-96">
            {/*
              relative: Next.jsの<Image fill>を使うために必要（子要素を絶対配置にするベース）
              w-full: 横幅を親（Card）いっぱいに広げる
              h-64: モバイルなど小さい画面で高さ256px（16×16）
              lg:h-96: 画面幅1024px以上で高さ384pxに拡大
            */}

            <Image
              src={post.topImage}
              alt={post.title}
              fill
              sizes="100vw"
              priority
              className="rounded-t-md object-cover"
            />
          </div>
        )}

        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-500">
              投稿者: {post.author.userName}
            </p>
            <time className="text-sm text-gray-500">
              {format(new Date(post.createdAt), "yyyy年MM月dd日", {
                locale: ja,
              })}
            </time>
          </div>
          <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              skipHtml={false} // HTMLスキップを無効化
              unwrapDisallowed={true} // Markdownの改行を解釈
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostPage;
