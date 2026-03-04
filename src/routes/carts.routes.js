import { Router } from 'express';
import * as cc from '../controller/carts.controller.js';

const router = Router();

// ==================== RUTAS GET ====================

// Obtener todos los carritos
router.get('/', (req, res) => cc.getCarts(req, res));

// Obtener carrito por ID
router.get('/:cid', (req, res) => cc.getCartById(req, res));

// ==================== RUTAS POST ====================

// Crear nuevo carrito
router.post('/', (req, res) => cc.postCart(req, res));

// Agregar producto al carrito
router.post('/:cid/products/:pid', (req, res) => cc.addProductToCart(req, res));

// ==================== RUTAS PUT ====================

// Actualizar carrito completo
router.put('/:cid', (req, res) => cc.putCart(req, res));

// Actualizar cantidad de producto en carrito
router.put('/:cid/products/:pid', (req, res) => cc.updateProductQuantityInCart(req, res));

// ==================== RUTAS DELETE ====================

// Eliminar carrito completo
router.delete('/:cid', (req, res) => cc.deleteCart(req, res));

// Eliminar producto del carrito
router.delete('/:cid/products/:pid', (req, res) => cc.removeProductFromCart(req, res));

// Vaciar carrito
router.delete('/:cid/clear', (req, res) => cc.clearCart(req, res));

export default router;
