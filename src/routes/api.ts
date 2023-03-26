import express, { Request, Response } from "express";
import { startGame, finishGame } from "../controllers/game/gameController";
import { signup, login } from "../controllers/auth/authController";
import { getUser, getTopPlayers } from "../controllers/user/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

// Authentication routes
router.post("/auth/signup", signup);
router.post("/auth/login", login);

// User routes
router.get("/users/user", authMiddleware, getUser);
router.get("/users/top", authMiddleware, getTopPlayers);

// Game routes
router.get("/game/start", authMiddleware, startGame);
router.post("/game/finish", authMiddleware, finishGame);

router.use("*", (_req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

export default router;
