export interface Comment {
  id: string;
  postId: string;
  content: string;
  userId: string;        
  userName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCommentDto {
  content: string;
  userId: string;        
  userName: string;
}
