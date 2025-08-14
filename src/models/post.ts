import { v4 as uuidv4 } from "uuid";
import { Post } from "../types/post";

export const createPost = (
  content: string,
  userId: string,
  userName: string
): Post => {
  return {
    id: uuidv4(),
    content,
    likes: 0,
    dislikes: 0,
    userId,
    userName,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

export const updatePostContent = (post: Post, content: string): Post => {
  return {
    ...post,
    content,
    updatedAt: new Date(),
  };
};

export const incrementLikes = (post: Post): Post => {
  return {
    ...post,
    likes: post.likes + 1,
    updatedAt: new Date(),
  };
};

export const decrementLikes = (post: Post): Post => {
  return {
    ...post,
    likes: Math.max(0, post.likes - 1),
    updatedAt: new Date(),
  };
};

export const incrementDislikes = (post: Post): Post => {
  return {
    ...post,
    dislikes: post.dislikes + 1,
    updatedAt: new Date(),
  };
};

export const decrementDislikes = (post: Post): Post => {
  return {
    ...post,
    dislikes: Math.max(0, post.dislikes - 1),
    updatedAt: new Date(),
  };
};
