import passport from "passport";
import { Request, Response } from "express";
import {
	findRow,
	insertRow
} from "../helpers/crud";
import argon2 from "argon2";

const login = passport.authenticate("local", {
	failureRedirect: "/auth/error",
	successRedirect: "/auth/success"
});

const authError = async (req: Request, res: Response): Promise<Response> => {
	return res.json(await JSON.stringify({
		http: 418,
		msg: "I'm a teapot."
	}));
};

const authSuccess = async (req: Request, res: Response): Promise<Response> => {
	return res.json(await JSON.stringify({
		http: 200,
		msg: "OK."
	}));
};

const logout = async (req: Request, res: Response, next: Function) => {
	req.logout((err) => {
		if(err){
			console.log("[ERROR] User is not logged out.");
			return next(err);
		}
		console.log("[SUCCESS] User is logged out now.");
		res.redirect("/auth/success");
	});
};

const signup = async (req: Request, res: Response): Promise<Response | any> => {
	try{
		if(!req.body){
			console.log("[ERROR] No user data.");
			throw new Error("[ERROR] No user data.");
		}
		let {
			name,
			email,
			password
		} = req.body;
		let result = await findRow("users", ["email"], [email]);
		if(result.length != 0){
			console.log("[ERROR] User already exists.");
			throw new Error("[ERROR] User already exists.");
		}
		let hash = await argon2.hash(password);
		let state = await insertRow("users", {
			name,
			email,
			password: hash,
			user_insert: "System",
			user_update: "System"
		});
		console.log("[SUCCESS] User registred correctly. Logging in...");
		return res.redirect("/auth/login");
	}catch(e){
		console.log(e);
		return res.redirect("/auth/error");
	}
};

export {
	login,
	authError,
	authSuccess,
	logout,
	signup
};
