//Router
import {Router} from "express";

//File System
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

//Manager
import {CartManager} from "../manager/Cart.manager.js";

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cartPath = path.join(__dirname, "../db/carts.json");
const carts = JSON.parse(fs.readFileSync(new URL(cartPath, import.meta.url), "utf-8"));
const cartManager = new CartManager(carts);

//Crea un nuevo carrito
router.post('/', (req, res) => {
    const { products } = req.body;
    
    const result = cartManager.createCart(products);
    if (result.error) {
        res.status(result.status).send(result.error);
    } else {
        res.status(result.status).json(result.cart);
        fs.writeFileSync(cartPath, JSON.stringify(carts, null, 4));
    }
});

//Retorna los productos de un carrito segun su id
router.get('/:cid', (req, res) => {
    const { cid } = req.params;
    const result = cartManager.getCartById(parseInt(cid));
    if (result.error) {
        res.status(result.status).send(result.error);
    } else {
        res.status(result.status).json(result.cart);
        fs.writeFileSync(cartPath, JSON.stringify(carts, null, 4));
    }
});

//Agrega un producto a un carrito
router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const result = cartManager.addProductToCart(parseInt(cid), parseInt(pid));
    if (result.error) {
        res.status(result.status).send(result.error);
    } else {
        res.status(result.status).json(result.product);
        fs.writeFileSync(cartPath, JSON.stringify(carts, null, 4));
    }
});    

export default router;