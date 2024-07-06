import { Router } from "express";
import HelloWordRouter from "./HelloWord.router"
import UserRouter from "./User.router"
import MovieRouter from "./Movie.router"

const router = Router()

router.use(HelloWordRouter)
router.use(UserRouter)
router.use(MovieRouter)

export default router;