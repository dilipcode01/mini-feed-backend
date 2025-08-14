import { Router } from "express";
import postsRoutes from "./posts";
import commentsRoutes from "./comments";
import authRoutes from "./user";

const router = Router();

router.use("/posts", postsRoutes);
router.use("/comment", commentsRoutes);
router.use("/auth", authRoutes);

export default router;
