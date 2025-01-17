import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  loginUser,
  updateUser,
} from "../controllers/User.controller";
import { authenticationMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/login", loginUser)
router.get("/users", authenticationMiddleware, getUsers, );
router.post("/users", createUser);
router.patch("/users/:id",  authenticationMiddleware, updateUser);
router.delete("/users/:id", authenticationMiddleware, deleteUser);

export default router;
