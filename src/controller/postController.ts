import { Request, Response } from "express";
import { CreatePostDto, LikeAction } from "../types/post";
import { ApiResponse } from "../types/response";
import {
  createNewPost,
  fetchAllPosts,
  fetchPostById,
  updatePostLikes,
} from "../services/postService";

export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const createPostDto: CreatePostDto = req.body;

    const userId = req.user?.email;

    if (!userId) {
      res.status(400).json({
        success: false,
        error: "User authentication required",
      } as ApiResponse);
      return;
    }

    const result = await createNewPost(createPostDto, userId);

    if (result.success) {
      res.status(201).json({
        success: true,
        data: result.data,
      } as ApiResponse);
    } else {
      res.status(400).json({
        success: false,
        error: result.error,
      } as ApiResponse);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    } as ApiResponse);
  }
};

export const getAllPosts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await fetchAllPosts();

    if (result.success) {
      res.json({
        success: true,
        data: result.data,
      } as ApiResponse);
    } else {
      res.status(500).json({
        success: false,
        error: result.error,
      } as ApiResponse);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    } as ApiResponse);
  }
};

export const getPostById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const result = await fetchPostById(id);

    if (result.success) {
      res.json({
        success: true,
        data: result.data,
      } as ApiResponse);
    } else {
      res.status(404).json({
        success: false,
        error: result.error,
      } as ApiResponse);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    } as ApiResponse);
  }
};

export const updateLikes = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const likeAction: LikeAction = req.body;

    const userId = req.user?.email;

    if (!userId) {
      res.status(400).json({
        success: false,
        error: "User authentication is required",
      } as ApiResponse);
      return;
    }

    const result = await updatePostLikes(id, likeAction, userId);

    if (result.success) {
      res.json({
        success: true,
        data: result.data,
      } as ApiResponse);
    } else {
      res.status(400).json({
        success: false,
        error: result.error,
      } as ApiResponse);
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error",
    } as ApiResponse);
  }
};
