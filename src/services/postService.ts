import { Post, CreatePostDto, LikeAction } from "../types/post";
import {
  createPost,
  incrementLikes,
  decrementLikes,
  incrementDislikes,
  decrementDislikes,
} from "../models/post";
import {
  getAllPosts,
  getPostById,
  addPost,
  updatePost,
  deletePost,
  setUserLikeStatus,
  getUserLikeStatus,
} from "../models/database";
import { validateCreatePost, validateLikeAction } from "../utils/validation";
import { sanitizeContent } from "../utils/helpers";
import { findUserByEmail } from "./userService";

export const createNewPost = async (
  createPostDto: CreatePostDto,
  userId: string
): Promise<{ success: boolean; data?: Post; error?: string }> => {
  try {
    const user = findUserByEmail(userId);
    if (!user) {
      return { success: false, error: "User not found" };
    }

    const validation = validateCreatePost(createPostDto);
    if (validation) {
      return { success: false, error: validation };
    }

    const sanitizedContent = sanitizeContent(createPostDto.content);
    const newPost = createPost(sanitizedContent, user.id, user.name);
    const savedPost = addPost(newPost);

    return { success: true, data: savedPost };
  } catch (error) {
    return { success: false, error: "Failed to create post" };
  }
};

export const fetchAllPosts = async (): Promise<{
  success: boolean;
  data?: Post[];
  error?: string;
}> => {
  try {
    const posts = getAllPosts();
    return { success: true, data: posts };
  } catch (error) {
    return { success: false, error: "Failed to fetch posts" };
  }
};

export const fetchPostById = async (
  id: string
): Promise<{ success: boolean; data?: Post; error?: string }> => {
  try {
    const post = getPostById(id);
    if (!post) {
      return { success: false, error: "Post not found" };
    }
    return { success: true, data: post };
  } catch (error) {
    return { success: false, error: "Failed to fetch post" };
  }
};

export const updatePostLikes = async (
  id: string,
  action: LikeAction,
  userId: string
): Promise<{ success: boolean; data?: Post; error?: string }> => {
  try {
    if (!userId) {
      return { success: false, error: "User ID is required" };
    }

    if (!validateLikeAction(action.action)) {
      return { success: false, error: "Invalid action" };
    }

    const post = getPostById(id);
    if (!post) {
      return { success: false, error: "Post not found" };
    }

    const currentStatus = getUserLikeStatus(userId, id);
    let updatedPost = { ...post };
    let newLiked = currentStatus.liked;
    let newDisliked = currentStatus.disliked;

    if (action.action === "like") {
      if (currentStatus.liked) {
        updatedPost = decrementLikes(updatedPost);
        newLiked = false;
      } else {
        updatedPost = incrementLikes(updatedPost);
        newLiked = true;

        if (currentStatus.disliked) {
          updatedPost = decrementDislikes(updatedPost);
          newDisliked = false;
        }
      }
    } else if (action.action === "dislike") {
      if (currentStatus.disliked) {
        updatedPost = decrementDislikes(updatedPost);
        newDisliked = false;
      } else {
        updatedPost = incrementDislikes(updatedPost);
        newDisliked = true;

        if (currentStatus.liked) {
          updatedPost = decrementLikes(updatedPost);
          newLiked = false;
        }
      }
    }

    setUserLikeStatus(userId, id, newLiked, newDisliked);

    const savedPost = updatePost(id, updatedPost);
    if (!savedPost) {
      return { success: false, error: "Failed to update post" };
    }

    return { success: true, data: savedPost };
  } catch (error) {
    return { success: false, error: "Failed to update post likes" };
  }
};

export const removePost = async (
  id: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    const deleted = deletePost(id);
    if (!deleted) {
      return { success: false, error: "Post not found" };
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete post" };
  }
};
