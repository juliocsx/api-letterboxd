import { Router } from "express"; 
import { getHelloWorld } from "../controllers/HelloWorld.controller";

const router = Router()

router.get("/hello-world", getHelloWorld) // localhost:3000/api/hello-world

export default router;