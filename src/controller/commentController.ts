import { Request, Response } from "express";
import { CreateCommentDto } from "../types/comment";
import { ApiResponse } from "../types/response";
import {
  createNewComment,
  fetchCommentsByPostId,
} from "../services/commentService";

export const createComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { postId } = req.params;
    const createCommentDto: CreateCommentDto = req.body;

    const userId = req.user?.email;

    if (!userId) {
      res.status(400).json({
        success: false,
        error: "User authentication is required",
      } as ApiResponse);
      return;
    }

    const result = await createNewComment(postId, createCommentDto, userId);

    if (result.success) {
      res.status(201).json({
        success: true,
        data: result.data,
      } as ApiResponse);
    } else {
      res.status(result.error === "Post not found" ? 404 : 400).json({
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

export const getCommentsByPostId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { postId } = req.params;

    const result = await fetchCommentsByPostId(postId);

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
