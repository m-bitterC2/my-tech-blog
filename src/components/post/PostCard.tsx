"use client";

import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { PostCardProps } from "@/types/post";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PostCard = ({ post }: PostCardProps) => {
  const router = useRouter();

  return (
    <>
      <Card
        className="cursor-pointer hover:shadow-lg transition-shadow pt-0"
        onClick={() => router.push(`/posts/${post.id}`)}
      >
        {/*
          hover:shadow-lg: ホバー時に大きめの影を表示。
          transition-shadow: 影の変化にアニメーションを適用。
        */}

        {post.topImage && (
          // 親要素に position: relative を指定（fill 使用時に必須）
          <div className="relative w-full h-48">
            <Image
              src={post.topImage}
              alt={post.title}
              // 画像を親要素にぴったり合わせて表示（高さ・幅は親依存）
              fill
              // ビューポート幅に応じた画像の表示サイズを指定（レスポンシブ最適化）
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              // ページ読み込み時に優先して画像をプリロード（ファーストビュー向け）
              priority
              // rounded-t-md: 画像の上部角を中程度に丸める
              // object-cover: アスペクト比を維持しつつ、画像が枠を覆うように表示（はみ出しはトリミング）
              className="rounded-t-md object-cover"
            />
          </div>
        )}

        <CardHeader>
          <CardTitle className="line-clamp-2">
            {/*
              line-clamp-2: テキストを2行で切り詰め、それ以降は … にする。
                            長いタイトルでもカードの高さを一定に保つのに便利。
            */}

            {post.title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {/*
              text-sm: 小さめの文字サイズ。
              text-gray-600: やや薄いグレーの文字色。
              mb-2: 下に 0.5rem のマージン。
              line-clamp-2: 同上。本文も2行で切り詰め。
            */}

            {post.content}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            {/*
              flex: フレックスボックスレイアウト。
              items-center: 縦方向中央揃え。
              justify-between: 左右の要素を両端に配置。
              text-sm: 小さめの文字サイズ。
              text-gray-500: 薄めのグレー色で補足情報としての視覚的区別。
            */}

            <span>{post.author.userName}</span>
            <time>
              {/* 「5分前」「2日前」などの相対時刻を日本語で表示 */}
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
                locale: ja,
              })}
            </time>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default PostCard;
