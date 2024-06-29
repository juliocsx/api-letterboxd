import { Router } from "express";
import HelloWordRouter from "./HelloWord.router"
import UserRouter from "./User.router"

const router = Router()

router.use(HelloWordRouter)
router.use(UserRouter)

export default router;