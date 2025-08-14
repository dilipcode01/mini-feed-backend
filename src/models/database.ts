import { Post } from "../types/post";
import { Comment } from "../types/comment";

let posts: Post[] = [];
let comments: Comment[] = [];

let userLikes: Map<
  string,
  {
    userId: string;
    postId: string;
    liked: boolean;
    disliked: boolean;
  }
> = new Map();

const getUserPostKey = (userId: string, postId: string): string => {
  return `${userId}_${postId}`;
};

export const getAllPosts = (): Post[] => {
  return [...posts].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
};

export const getPostById = (id: string): Post | undefined => {
  return posts.find((post) => post.id === id);
};

export const addPost = (post: Post): Post => {
  posts.push(post);
  return post;
};

export const updatePost = (id: string, updatedPost: Post): Post | undefined => {
  const index = posts.findIndex((post) => post.id === id);
  if (index !== -1) {
    posts[index] = updatedPost;
    return updatedPost;
  }
  return undefined;
};

export const deletePost = (id: string): boolean => {
  const initialLength = posts.length;
  posts = posts.filter((post) => post.id !== id);

  comments = comments.filter((comment) => comment.postId !== id);

  for (const [key] of userLikes.entries()) {
    if (key.endsWith(`_${id}`)) {
      userLikes.delete(key);
    }
  }

  return posts.length < initialLength;
};

export const getUserLikeStatus = (userId: string, postId: string) => {
  const key = getUserPostKey(userId, postId);
  return (
    userLikes.get(key) || { userId, postId, liked: false, disliked: false }
  );
};

export const setUserLikeStatus = (
  userId: string,
  postId: string,
  liked: boolean,
  disliked: boolean
) => {
  const key = getUserPostKey(userId, postId);
  userLikes.set(key, { userId, postId, liked, disliked });
};

export const getAllComments = (): Comment[] => {
  return [...comments];
};

export const getCommentsByPostId = (postId: string): Comment[] => {
  return comments
    .filter((comment) => comment.postId === postId)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
};

export const getCommentById = (id: string): Comment | undefined => {
  return comments.find((comment) => comment.id === id);
};

export const addComment = (comment: Comment): Comment => {
  comments.push(comment);
  return comment;
};

export const updateComment = (
  id: string,
  updatedComment: Comment
): Comment | undefined => {
  const index = comments.findIndex((comment) => comment.id === id);
  if (index !== -1) {
    comments[index] = updatedComment;
    return updatedComment;
  }
  return undefined;
};

export const deleteComment = (id: string): boolean => {
  const initialLength = comments.length;
  comments = comments.filter((comment) => comment.id !== id);
  return comments.length < initialLength;
};

export const initializeDatabase = () => {
  posts = [];
  comments = [];
  userLikes = new Map();
};
