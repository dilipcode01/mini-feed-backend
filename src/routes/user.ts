import { Router } from "express";
import { login } from "../controller/userController";

const router = Router();

router.post("/login", login);

export default router;
