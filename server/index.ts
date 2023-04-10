import Server from "./server";

const main = async () => {
	try{
		const app = new Server(3000);
		await app.listen();
	}catch(error: any){
		console.error(error);
		console.error("[ERROR] Fatal error.");
	}
};

main();
