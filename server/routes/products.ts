import { Router } from "express";
import {
	getProducts,
	insertProducts,
	updateProducts,
	deleteProducts,
	findProduct,
	searchProduct
} from "../controllers/products";
let router = Router();

router.route("/products").get(getProducts);
router.route("/products").post(insertProducts);
router.route("/products").put(updateProducts);
router.route("/products").delete(deleteProducts);

router.route("/products/search").post(searchProduct);
router.route("/products/find").post(findProduct);

export default router;
