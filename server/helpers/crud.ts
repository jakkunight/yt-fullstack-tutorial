import { RowDataPacket, OkPacket, FieldPacket } from "mysql2";
import connect from "../database/db";

const readTable = async (table: string): Promise<RowDataPacket[]> => {
	try{
		const connection = await connect();
		const result: [RowDataPacket[], FieldPacket[]] = await connection.query("SELECT * FROM " + table);
		console.log("[SUCCESS] Table read.");
		return result[0];
	}catch(e){
		console.log(e);
		throw new Error("Cannot read table. Aborting...");
	}
};
const findRow = async (table: string, keys: Array<string>, values: Array<any>): Promise<RowDataPacket[]> => {
	try{
		const connection = await connect();
		let condition: string = "";
		for(let i = 0; i < keys.length; i++){
			condition += keys[i] + " = '" + values[i] + "'";
			if(i != keys.length - 1){
				condition += " AND ";
			}
		}
		const result: [RowDataPacket[], FieldPacket[]] = await connection.query("SELECT * FROM " + table + " WHERE " + condition);
		console.log("[SUCCESS] Row found.");
		return result[0];
	}catch(e){
		console.log(e);
		throw new Error("The requested row doesn't exists. Aborting...");
	}
};
const searchRow = async (table: string, keys: Array<string>, values: Array<any>): Promise<RowDataPacket[]> => {
	try{
		const connection = await connect();
		let condition: string = "";
		for(let i = 0; i < keys.length; i++){
			condition += keys[i] + " LIKE '%" + values[i] + "%'";
			if(i != keys.length - 1){
				condition += " OR ";
			}
		}
		const result: [RowDataPacket[], FieldPacket[]] = await connection.query("SELECT * FROM " + table + " WHERE " + condition);
		console.log("[SUCCESS] Rows found.");
		return result[0];
	}catch(e){
		console.log(e);
		throw new Error("The requested row doesn't exists. Aborting...");
	}
};
const insertRow = async (table: string, rowData: Object): Promise<OkPacket[]> => {
	try{
		const connection = await connect();
		const result: [OkPacket[], FieldPacket[]] = await connection.query("INSERT INTO " + table + " SET ?", [rowData]);
		console.log("[SUCCESS] Row created.");
		return result[0];
	}catch(e){
		console.log(e);
		throw new Error("The requested row doesn't exists. Aborting...");
	}
};
const updateRow = async (table: string, rowData: Object, id: string | number): Promise<OkPacket[]> => {
	try{
		const connection = await connect();
		const result: [OkPacket[], FieldPacket[]] = await connection.query("UPDATE " + table + " SET ? WHERE id = ?", [rowData, id]);
		console.log("[SUCCESS] Row updated.");
		return result[0];
	}catch(e){
		console.log(e);
		throw new Error("The requested row doesn't exists. Aborting...");
	}
};
const deleteRow = async (table: string, id: string | number): Promise<OkPacket[]> => {
	try{
		const connection = await connect();
		const result: [OkPacket[], FieldPacket[]] = await connection.query("DELETE FROM " + table + " WHERE id = ?", [id]);
		console.log("[SUCCESS] Row deleted.");
		return result[0];
	}catch(e){
		console.log(e);
		throw new Error("The requested row doesn't exists. Aborting...");
	}
};
 
export {
	readTable,
	findRow,
	searchRow,
	insertRow,
	updateRow,
	deleteRow
};
