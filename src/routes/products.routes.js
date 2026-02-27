import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ProductManager } from '../manager/Product.manager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta a la base de datos de productos
const productsPath = path.join(__dirname, '../db/products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

// Crear instancia del ProductManager
const productManager = new ProductManager(products);

import { Router } from 'express';
import { getProducts, getProductById, getProductsByField } from '../controller/products.controller.js';

const router = Router();

// GET /api/products
router.get('/', getProducts);

// GET /api/products/:id
router.get('/:id', getProductById);

// GET /api/products/filter/:field?value=xxx
router.get('/filter/:field', getProductsByField);

export default router;

// Obtener producto por ID
router.get('/:pid', (req, res) => {
    const { pid } = req.params;
    const product = productManager.getProductById(parseInt(pid));

    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(product);
});

// ==================== RUTAS POST ====================

// Crear nuevo producto
router.post('/', (req, res) => {
    const result = productManager.addProduct(req.body);

    if (result.error) {
        return res.status(result.status).json({ error: result.error });
    }

    // Guardar en archivo
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 4));

    res.status(result.status).json(result.product);
});

// ==================== RUTAS PATCH ====================

// Actualizar producto
router.patch('/:pid', (req, res) => {
    const { pid } = req.params;
    const result = productManager.patchProduct(parseInt(pid), req.body);

    if (result.error) {
        return res.status(result.status).json({ error: result.error });
    }

    // Guardar en archivo
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 4));

    res.status(result.status).json(result.product);
});

// ==================== RUTAS DELETE ====================

// Eliminar producto
router.delete('/:pid', (req, res) => {
    const { pid } = req.params;
    const result = productManager.deleteProduct(parseInt(pid));

    if (result.error) {
        return res.status(result.status).json({ error: result.error });
    }

    // Guardar en archivo
    fs.writeFileSync(productsPath, JSON.stringify(products, null, 4));

    res.status(result.status).json({
        message: 'Producto eliminado exitosamente',
        product: result.product,
    });
});
