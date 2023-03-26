"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var gameController_1 = require("../controllers/game/gameController");
var authController_1 = require("../controllers/auth/authController");
var userController_1 = require("../controllers/user/userController");
var authMiddleware_1 = require("../middleware/authMiddleware");
var router = express_1.default.Router();
router.post("/auth/signup", authController_1.signup);
router.post("/auth/login", authController_1.login);
router.get("/users/user", authMiddleware_1.authMiddleware, userController_1.getUser);
router.get("/users/top", authMiddleware_1.authMiddleware, userController_1.getTopPlayers);
router.get("/game/start", authMiddleware_1.authMiddleware, gameController_1.startGame);
router.post("/game/finish", authMiddleware_1.authMiddleware, gameController_1.finishGame);
router.use("*", function (_req, res) {
    res.status(404).json({ message: "Route not found" });
});
exports.default = router;
//# sourceMappingURL=api.js.map