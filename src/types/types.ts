export interface Post {
  id: string;
  authorId: string;
  title: string;
  caption: string;
  dateTime: Date;
  comments: Comment[];
  imageUrls: string[] | null;
  likes: Like[];
  likeCount: number;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  caption: string;
  dateTime: Date;
  imageUrls: string[] | null;
  likes: Like[];
  likeCount: number;
}

export interface Like {
  id: string;
  userId: string;
  postId: string | null;
  commentId: string | null;
  liked: boolean;
}

export interface Image {
  id: string;
  url: string;
  posts: Post[]; // Relation avec les posts qui utilisent cette image
  comments: Comment[]; // Relation avec les commentaires qui utilisent cette image
}
