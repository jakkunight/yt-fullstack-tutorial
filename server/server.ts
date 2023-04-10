import express, { Application } from "express";
import expressSession, { SessionOptions } from "express-session";
import fileupload from "express-fileupload";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import strategy from "./configs/passport";
import products from "./routes/products";
import auth from "./routes/auth";

class Server {
	private server: Application;
	private corsOptions: Object;
	private sessionOptions: SessionOptions;
	private settings = () => {
		this.corsOptions = {
			origin: [
				"localhost",
				"127.0.0.1",
				"jakkunight.github.io"
			],
			optionsSuccessStatus: 204,
			preflightContinue: true,
			credentials: true,
			allowedHeaders: [
				"Content-Type",
				"Authorization"
			]
		};
		this.sessionOptions = {
			secret: "secret",
			resave: false,
			saveUninitialized: false
		};
		this.server.set("port", this.port);
	};
	private middlewares = () => {
		this.server.use(fileupload());
		this.server.use(bodyParser.urlencoded({extended: true}));
		this.server.use(bodyParser.json());
		this.server.use(cookieParser());
		this.server.use(cors(this.corsOptions));
		this.server.use(expressSession(this.sessionOptions));
		this.server.use(passport.initialize());
		passport.use(strategy);
		this.server.use(passport.session());
		this.server.use(async (req, res, next) => {
			console.log("[" + req.method + "]", req.protocol + "://" + req.hostname + ":" + this.server.get("port") + req.url);
			console.log("[" + req.ip + "]", req.headers.origin);
			if(req.user){
				console.log(req.user);
			}
			next();
		});
	};
	private routes = () => {
		this.server.route("*").options(cors(this.corsOptions));
		this.server.use(products);
		this.server.use(auth);
	};
	listen = async () => {
		try{
			await this.server.listen(this.server.get("port"));
			console.log("[SUCCESS] Server on port", this.server.get("port"));	
		}catch(error: any){
			console.error(error);
			console.error("[ERROR] Fatal error.");
		}
	};
	constructor(private port?: number | string){
		this.server = express();
		this.corsOptions = {};
		this.sessionOptions = {
			secret: "secret",
			resave: false,
			saveUninitialized: false
		};
		this.settings();
		this.middlewares();
		this.routes();
	};
};

export default Server;
