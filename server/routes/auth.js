import express from "express";

import { register, login } from "../controllers/auth.js";

const authRouter = express.Router();

export const registerRouter = authRouter.post("/", register);
export const loginRouter = authRouter.post("/signin", login);
