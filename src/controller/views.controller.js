import * as cs from '../services/carts.service.js';
import * as ps from '../services/products.service.js';
import Product from '../models/products.model.js';

export const RenderProducts = async (req, res) => {
    try {
        const result = await ps.getProductsService(req);
        const plainProducts = result.payload.map(doc => doc.toObject());
        
        //Me traigo todas las categorias para el filtro
        const categories = await Product.distinct('category');
        
        const currentFilters = {
            name: req.query.name || '',
            minPrice: req.query.minPrice || '',
            maxPrice: req.query.maxPrice || '',
            categories: Array.isArray(req.query.categories) ? req.query.categories : (req.query.categories ? [req.query.categories] : []),
            available: req.query.available === 'on' || req.query.available === 'true',
            sort: req.query.sort || ''
        };
        
        //Por cada busqueda renderizo la vista index
        res.render('index', { 
            products: plainProducts, 
            categories,
            currentFilters,
            pagination: {
                totalPages: result.totalPages,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.prevLink,
                nextLink: result.nextLink
            }
        });
    } catch (error) {
        res.status(500).render('error', { error: 'Error cargando productos' });
    }
}

export const RenderProductDetail = async (req, res) => {
    try {
        const product = await ps.getProductsServiceById(req.params.pid);
        if (!product) {
            return res.status(404).render('error', { error: 'Producto no encontrado' });
        }
        res.render('productDetail', { product: product.toObject() });
    } catch (error) {
        res.status(500).render('error', { error: 'Error cargando detalle de producto' });
    }
}

export const RenderCart = async (req, res) => {
    try {
        const cart = await cs.getCartByIdService(req.params.cid);
        if (!cart) {
            return res.status(404).render('error', { error: 'Carrito no encontrado' });
        }
        res.render('cart', { cart: cart.toObject() });
    } catch (error) {
        res.status(500).render('error', { error: 'Error cargando carrito' });
    }
} 