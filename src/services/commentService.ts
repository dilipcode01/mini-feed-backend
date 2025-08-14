import { Comment, CreateCommentDto } from "../types/comment";
import { createComment } from "../models/comment";
import {
  getCommentsByPostId,
  addComment,
  getPostById,
} from "../models/database";
import { validateCreateComment } from "../utils/validation";
import { sanitizeContent } from "../utils/helpers";
import { findUserByEmail } from "./userService";

export const createNewComment = async (
  postId: string,
  createCommentDto: CreateCommentDto,
  userId: string
): Promise<{ success: boolean; data?: Comment; error?: string }> => {
  try {
    const post = getPostById(postId);
    if (!post) {
      return { success: false, error: "Post not found" };
    }

    const user = findUserByEmail(userId);
    if (!user) {
      return { success: false, error: "User not found" };
    }

    const validation = validateCreateComment(createCommentDto);
    if (validation) {
      return { success: false, error: validation };
    }

    const sanitizedContent = sanitizeContent(createCommentDto.content);

    const newComment = createComment(
      postId,
      sanitizedContent,
      user.id,
      user.name
    );
    const savedComment = addComment(newComment);

    return { success: true, data: savedComment };
  } catch (error) {
    return { success: false, error: "Failed to create comment" };
  }
};

export const fetchCommentsByPostId = async (
  postId: string
): Promise<{ success: boolean; data?: Comment[]; error?: string }> => {
  try {
    const post = getPostById(postId);
    if (!post) {
      return { success: false, error: "Post not found" };
    }

    const comments = getCommentsByPostId(postId);
    return { success: true, data: comments };
  } catch (error) {
    return { success: false, error: "Failed to fetch comments" };
  }
};
