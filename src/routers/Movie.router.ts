import { Router } from "express";
import { createMovie, getMovie, updateMovie } from "../controllers/Movie.controller";

const router = Router();

router.get("/movies", getMovie)
router.post("/movies", createMovie)
router.patch("/movies/:id", updateMovie)

export default router;