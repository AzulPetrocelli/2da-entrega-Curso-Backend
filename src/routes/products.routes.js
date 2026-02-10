import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ProductManager } from '../manager/Product.manager.js';

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta a la base de datos de productos
const productsPath = path.join(__dirname, '../db/products.json');
const products = JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

// Crear instancia del ProductManager
const productManager = new ProductManager(products);

// ==================== RUTAS GET ====================

// Obtener todos los productos
router.get('/', (req, res) => {
    const allProducts = productManager.getProducts();

    // Si se solicita con query de límite
    const limit = req.query.limit ? parseInt(req.query.limit) : null;

    if (limit) {
        return res.json(allProducts.slice(0, limit));
    }

    res.json(allProducts);
});

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

export default router;
