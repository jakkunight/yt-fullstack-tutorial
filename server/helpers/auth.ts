import { Request, Response } from "express";

const isAuth = (req: Request, res: Response, next: Function): Response | Function => {
	if(req.user){
		return next();
	}
	return res.send("Login first!!!");
};

export default isAuth;
