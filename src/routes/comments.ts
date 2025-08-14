import { Router } from "express";
import {
  createComment,
  getCommentsByPostId,
} from "../controller/commentController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.post("/:postId/comments", authenticateToken, createComment);
router.get("/:postId/comments", getCommentsByPostId);

export default router;
