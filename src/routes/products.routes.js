import { Router } from 'express';
import * as pc from '../controller/products.controller.js';

const router = Router();

// ==================== RUTAS GET ====================

// GET /api/products
router.get('/', (req, res) => pc.getProducts(req, res));

// GET /api/products/:id
router.get('/:id', (req, res) => pc.getProductById(req, res));

// GET /api/products/filter/:field?value=xxx
router.get('/filter/:field', (req, res) => pc.getProductsByField(req, res));

// ==================== RUTAS POST ====================

// POST /api/products
router.post('/', (req, res) => pc.postProduct(req, res));

// ==================== RUTAS PUT ====================
router.put('/:pid', (req, res) => pc.putProduct(req, res));

// ==================== RUTAS DELETE ====================
router.delete('/:pid', (req, res) => pc.deleteProduct(req, res));

export default router;
