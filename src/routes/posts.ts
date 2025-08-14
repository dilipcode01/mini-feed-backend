import { Router } from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updateLikes,
} from "../controller/postController";
import { authenticateToken } from "../middleware/auth";

const router = Router();

router.post("/", authenticateToken, createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.put("/:id/likes", authenticateToken, updateLikes);

export default router;
