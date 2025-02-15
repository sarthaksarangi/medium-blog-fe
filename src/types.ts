import { UpdatedBlogInput } from "@sarthak.dev/medium-common";

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
  createdAt: Date;
}

export interface BlogPostMenuProps {
  onEdit: (id: string, updates: UpdatedBlogInput) => Promise<any>;
  onDelete: (id: string) => Promise<any>;
  disabled?: true;
  id: string;
}
