import { CreatePostDto } from "../types/post";
import { CreateCommentDto } from "../types/comment";

export const validateCreatePost = (data: CreatePostDto): string | null => {
  if (!data.content) {
    return "Content is required";
  }

  if (typeof data.content !== "string") {
    return "Content must be a string";
  }

  if (data.content.trim().length === 0) {
    return "Content cannot be empty";
  }

  if (data.content.length > 280) {
    return "Content cannot exceed 280 characters";
  }

  return null;
};

export const validateCreateComment = (
  data: CreateCommentDto
): string | null => {
  if (!data.content) {
    return "Content is required";
  }

  if (typeof data.content !== "string") {
    return "Content must be a string";
  }

  if (data.content.trim().length === 0) {
    return "Content cannot be empty";
  }

  if (data.content.length > 500) {
    return "Comment cannot exceed 500 characters";
  }

  return null;
};

export const validateLikeAction = (action: string): boolean => {
  return ["like", "dislike", "removeLike", "removeDislike"].includes(action);
};
