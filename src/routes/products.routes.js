import { Router } from 'express';
import * as pc from '../controller/products.controller.js';

const router = Router();

// ==================== RUTAS GET ====================

// Obtener todos los productos
router.get('/', (req, res) => pc.getProducts(req, res));

// Obtener producto por ID
router.get('/:id', (req, res) => pc.getProductById(req, res));

// ==================== RUTAS POST ====================

// Agregar producto
router.post('/', (req, res) => pc.postProduct(req, res));

// ==================== RUTAS PUT ====================
//Actualar productpo segun ID
router.put('/:pid', (req, res) => pc.putProduct(req, res));

// ==================== RUTAS DELETE ====================
//Eliminar producto segun ID
router.delete('/:pid', (req, res) => pc.deleteProduct(req, res));

export default router;
