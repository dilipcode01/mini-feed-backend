import { v4 as uuidv4 } from "uuid";
import { Comment } from "../types/comment";

export const createComment = (
  postId: string,
  content: string,
  userId: string,
  userName: string
): Comment => {
  return {
    id: uuidv4(),
    postId,
    content,
    userId,
    userName,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

export const updateCommentContent = (
  comment: Comment,
  content: string
): Comment => {
  return {
    ...comment,
    content,
    updatedAt: new Date(),
  };
};
