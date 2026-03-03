import { Router } from 'express';
import * as vc from '../controller/views.controller.js';

const router = Router();

// Render lista de producto con paginacion
router.get('/', async (req, res) => vc.RenderProducts(req, res));

// Render detalle de producto
router.get('/product/:pid', async (req, res) => vc.RenderProductDetail(req, res));

// Render carrito
router.get('/carts/:cid', async (req, res) => vc.RenderCart(req, res));

export default router;
