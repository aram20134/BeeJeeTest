import { Router } from "express"
import { adminAuth } from "../middlewares/adminAuth.js"
import { TaskController } from "../controllers/task.controller.js"

const router = Router()

router.get("/", TaskController.getList)
router.post("/", TaskController.create)
router.put("/", adminAuth, TaskController.update)

export default router