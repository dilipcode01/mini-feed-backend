export interface Post {
  id: string;
  content: string;
  likes: number;
  dislikes: number;
  userId: string;        
  userName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePostDto {
  content: string;
  userId: string;        
  userName: string;  
}

export interface UpdatePostDto {
  content?: string;
}

export interface LikeAction {
  action: 'like' | 'dislike' | 'removeLike' | 'removeDislike';
}
