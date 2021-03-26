import express from "express";

import { register } from "../controllers/auth.js";

const authRouter = express.Router();

export const registerRouter = authRouter.post("/", register);