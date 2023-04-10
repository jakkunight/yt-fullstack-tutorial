import { createPool, Pool } from "mysql2/promise";
import { host, user, password } from "../.keys.json";

const connect = async (): Promise<Pool> => {
	const pool = await createPool({
		host: host || "localhost",
		port: 3306,
		connectionLimit: 10,
		database: "test",
		ssl: {
			rejectUnauthorized: true
		},
		user: user || "root",
		password: password || "karneval"
	});
	if(pool){
		console.log("[SUCCESS] Database is ONLINE.");
		return pool;
	}else{
		console.error("[ERROR] Database is OFFLINE.");
		throw new Error("Failed to connect to the DATABASE server. Aborting...");
	}
};

export default connect;
