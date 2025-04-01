import { UpdatedBlogInput } from "@sarthak.dev/medium-common";

export interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
  refetchBlogs: () => void;
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
  image?: string;
}

export interface BlogPostMenuProps {
  onEdit?: (id: string, updates: UpdatedBlogInput) => Promise<any>;
  onDelete: (id: string) => Promise<any>;
  disabled?: true;
  id: string;
  refetchBlogs: () => void;
}

export interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
}

export interface ImageDetails {
  file: File | null;
  previewUrl: string | null;
  cloudinaryURL?: string | null;
  cloudinaryImageId?: string | null;
}
export interface MainImageUploadProps {
  onImageSelected: (imageDetails: ImageDetails | null) => void;
  isUploading?: boolean;
  maxSizeMB?: number;
  initialImageUrl?: string | null;
}
