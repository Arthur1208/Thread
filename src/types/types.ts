export interface PostType {
  id: string;
  authorId: string;
  caption: string;
  dateTime: Date;
  comments: CommentType[];
  images: ImageType[];
  likes: LikeType[];
  likeCount: number;
}

export interface CommentType {
  id: string;
  postId: string;
  authorId: string;
  caption: string;
  dateTime: Date;
  images: ImageType[];
  likes: LikeType[];
  likeCount: number;
}

export interface LikeType {
  id: string;
  userId: string;
  postId: string | null;
  commentId: string | null;
  liked: boolean;
}

export interface ImageType {
  id: string;
  url: string;
  posts: PostType[]; // Relation avec les posts qui utilisent cette image
  comments: Comment[]; // Relation avec les commentaires qui utilisent cette image
}

export interface SessionType {
  user: {
    name: string;
    email: string;
    image: string;
    id?: string;
  };
}
