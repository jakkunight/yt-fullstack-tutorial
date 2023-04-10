import { Request } from "express";
import passport from "passport";
import LocalStrategy from "passport-local";
import argon2 from "argon2";
import {
	findRow
} from "../helpers/crud";

const strategy = new LocalStrategy.Strategy({
	usernameField: "email",
	passwordField: "password",
	session: false,
	passReqToCallback: true
}, async (req: Request, email: string, password: string, done: Function) => {
	try{
		let user = await findRow("users", ["email"], [email]);
		if(user.length == 0){
			console.log("[ERROR] Failed to find user.");
			throw new Error("User not found.");
		}
		if(!await argon2.verify(user[0].password, password)){
			console.log("[ERROR] Wrong password.");
			throw new Error("Password is incorrect.");
		}
		let { name, id } = user[0];
		let userData = {
			id,
			name,
			email
		};
		console.log("[SUCCESS] User logged in.");
		return done(null, userData);
	}catch(e){
		console.log(e);
		return done(null, e);
	}
});

passport.serializeUser((user: Object | any, done: Function) => {
	process.nextTick(() => {
		done(null, user);
	});
});
passport.deserializeUser((user: Object | any, done: Function) => {
	process.nextTick(() => {
		done(null, user);
	});
});

export default strategy;
