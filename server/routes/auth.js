import express from "express";

import { register, login, isAuthenticatedUser } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/signup", register);

authRouter.get("/signin", isAuthenticatedUser);

authRouter.post("/signin", login);

export default authRouter;
