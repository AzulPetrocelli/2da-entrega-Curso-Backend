import { Router } from 'express';
import * as pc from '../controller/products.controller.js';

const router = Router();

// ==================== RUTAS GET ====================

// GET /api/products
router.get('/', pc.getProducts);

// GET /api/products/:id
router.get('/:id', pc.getProductById);

// GET /api/products/filter/:field?value=xxx
router.get('/filter/:field', pc.getProductsByField);

// ==================== RUTAS POST ====================

router.post('/', pc.postProduct);

// ==================== RUTAS PUT ====================
router.put('/:pid', pc.putProduct);

// ==================== RUTAS DELETE ====================
router.delete('/:pid', pc.deleteProduct);

export default router;
