export type PostType = {
  id: string;
  title: string;
  content: string;
  topImage: string | null;
  createdAt: Date;
  author: {
    userName: string;
  };
};

export type PostCardProps = { post: PostType };
