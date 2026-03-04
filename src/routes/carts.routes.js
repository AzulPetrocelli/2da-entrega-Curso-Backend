import { Router } from 'express';
import * as cc from '../controller/carts.controller.js';

const router = Router();

// ==================== RUTAS GET ====================

// GET /api/carts
router.get('/', (res, req) => cc.getCarts(res, req));

// GET /api/carts/:cid
router.get('/:cid', (res, req) => cc.getCartById(res, req));

// ==================== RUTAS POST ====================

// POST /api/carts - Crear nuevo carrito
router.post('/', (res, req) => cc.postCart(res, req));

// POST /api/carts/:cid/products - Agregar producto al carrito
router.post('/:cid/products/:pid', (res, req) => cc.addProductToCart(res, req));

// ==================== RUTAS PUT ====================

// PUT /api/carts/:cid - Actualizar carrito completo
router.put('/:cid', (res, req) => cc.putCart(res, req));

// PUT /api/carts/:cid/products/:pid - Actualizar cantidad de producto en carrito
router.put('/:cid/products/:pid', (res, req) => cc.updateProductQuantityInCart(res, req));

// ==================== RUTAS DELETE ====================

// DELETE /api/carts/:cid - Eliminar carrito completo
router.delete('/:cid', (res, req) => cc.deleteCart(res, req));

// DELETE /api/carts/:cid/products/:pid - Eliminar producto del carrito
router.delete('/:cid/products/:pid', (res, req) => cc.removeProductFromCart(res, req));

// DELETE /api/carts/:cid/clear - Vaciar carrito
router.delete('/:cid/clear', (res, req) => cc.clearCart(res, req));

export default router;
