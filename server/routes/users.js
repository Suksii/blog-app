import express from "express";
import { updateUsername } from "../controllers/user.js";

const router = express.Router();

router.put('/update/:id', updateUsername)


export default router;