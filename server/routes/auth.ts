import { Router } from "express";
import {
	login,
	authError,
	authSuccess,
	logout,
	signup
} from "../controllers/auth";

let router = Router();

router.route("/auth/login").post(login);
router.route("/auth/error").get(authError);
router.route("/auth/success").get(authSuccess);
router.route("/auth/logout").post(logout);
router.route("/auth/signup").post(signup);

export default router;
