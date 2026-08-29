import Router from "express";
import { authHard } from "../middlewares/auth.js";
const router = Router();

router.get("/:link", async (req, res) => {});

router.post("/:original", authHard, async (req, res) => {});

export default router;
