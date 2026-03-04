import { Router } from 'express';
import * as cc from '../controller/carts.controller.js';

const router = Router();

// ==================== RUTAS GET ====================

// Obtener todos los carritos
router.get('/', (res, req) => cc.getCarts(res, req));

// Obtener carrito por ID
router.get('/:cid', (res, req) => cc.getCartById(res, req));

// ==================== RUTAS POST ====================

// Crear nuevo carrito
router.post('/', (res, req) => cc.postCart(res, req));

// Agregar producto al carrito
router.post('/:cid/products/:pid', (res, req) => cc.addProductToCart(res, req));

// ==================== RUTAS PUT ====================

// Actualizar carrito completo
router.put('/:cid', (res, req) => cc.putCart(res, req));

// Actualizar cantidad de producto en carrito
router.put('/:cid/products/:pid', (res, req) => cc.updateProductQuantityInCart(res, req));

// ==================== RUTAS DELETE ====================

// Eliminar carrito completo
router.delete('/:cid', (res, req) => cc.deleteCart(res, req));

// Eliminar producto del carrito
router.delete('/:cid/products/:pid', (res, req) => cc.removeProductFromCart(res, req));

// Vaciar carrito
router.delete('/:cid/clear', (res, req) => cc.clearCart(res, req));

export default router;
