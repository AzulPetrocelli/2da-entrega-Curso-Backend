import { Router } from 'express';
import * as cc from '../controller/carts.controller.js';

const router = Router();

// ==================== RUTAS GET ====================

// GET /api/carts
router.get('/', cc.getCarts);

// GET /api/carts/:cid
router.get('/:cid', cc.getCartById);

// ==================== RUTAS POST ====================

// POST /api/carts - Crear nuevo carrito
router.post('/', cc.postCart);

// POST /api/carts/:cid/products - Agregar producto al carrito
router.post('/:cid/products', cc.addProductToCart);

// ==================== RUTAS PUT ====================

// PUT /api/carts/:cid - Actualizar carrito completo
router.put('/:cid', cc.putCart);

// ==================== RUTAS DELETE ====================

// DELETE /api/carts/:cid - Eliminar carrito completo
router.delete('/:cid', cc.deleteCart);

// DELETE /api/carts/:cid/products/:pid - Eliminar producto del carrito
router.delete('/:cid/products/:pid', cc.removeProductFromCart);

// DELETE /api/carts/:cid/clear - Vaciar carrito
router.delete('/:cid/clear', cc.clearCart);

export default router;
