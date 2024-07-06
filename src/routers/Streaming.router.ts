import { Router } from "express";
import {
    createStreamings,
    getStreamings,
    updateStreamings,
}from "../controllers/Streaming.controller";
import {authenticationMiddleware} from "../middlewares/auth.middleware";

const router = Router();

router.get("/streamings", authenticationMiddleware, getStreamings);
router.post("/streamings", authenticationMiddleware, createStreamings);
router.patch("/streamings/:id", authenticationMiddleware, updateStreamings);

export default router;