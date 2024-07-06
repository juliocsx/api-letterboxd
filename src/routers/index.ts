import { Router } from "express";
import HelloWordRouter from "./HelloWord.router"
import UserRouter from "./User.router"
import MovieRouter from "./Movie.router"
import StreamingRouter from "./Streaming.router"

const router = Router()

router.use(HelloWordRouter)
router.use(UserRouter)
router.use(MovieRouter)
router.use(StreamingRouter)

export default router;