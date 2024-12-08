export interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}

export interface Blogs {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  author: {
    name: string;
  };
}
