import { Request, Response } from "express";
import {
	readTable,
	findRow,
	searchRow,
	insertRow,
	updateRow,
	deleteRow
} from "../helpers/crud";

const table = "products";

const getProducts = async (req: Request, res: Response): Promise<Response> => {
	try{
		return res.json(await JSON.stringify(await readTable(table)));
	}catch(e){
		console.error(e);
		return res.json(await JSON.stringify(e));
	}
};
const insertProducts = async (req: Request, res: Response): Promise<Response> => {
	try{
		return res.json(await JSON.stringify(await insertRow(table, req.body)));
	}catch(e){
		console.error(e);
		return res.json(await JSON.stringify(e));
	}
};
const updateProducts = async (req: Request, res: Response): Promise<Response> => {
	try{
		let id = req.body.id;
		delete req.body.id;
		return res.json(await JSON.stringify(await updateRow(table, req.body, id)));
	}catch(e){
		console.error(e);
		return res.json(await JSON.stringify(e));
	}
};
const deleteProducts = async (req: Request, res: Response): Promise<Response> => {
	try{
		return res.json(await JSON.stringify(await deleteRow(table, req.body.id)));
	}catch(e){
		console.error(e);
		return res.json(await JSON.stringify(e));
	}
};
const findProduct = async (req: Request, res: Response): Promise<Response> => {
	try{
		let keys = Object.keys(req.body);
		let values = Object.values(req.body);
		return res.json(await JSON.stringify(await findRow(table, keys, values)));
	}catch(e){
		console.error(e);
		return res.json(await JSON.stringify(e));
	}
};
const searchProduct = async (req: Request, res: Response): Promise<Response> => {
	try{
		let keys = Object.keys(req.body);
		let values = Object.values(req.body);
		return res.json(await JSON.stringify(await searchRow(table, keys, values)));
	}catch(e){
		console.error(e);
		return res.json(await JSON.stringify(e));
	}
};

export {
	getProducts,
	insertProducts,
	updateProducts,
	deleteProducts,
	findProduct,
	searchProduct
};

