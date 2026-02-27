import { getProductsService, getProductsServiceById } from '../services/products.service.js';

export const getProducts = async (req, res) => {
    try {
        const result = await getProductsService(req);
        res.status(200).json({ status: 'success', ...result });
    } catch (error) {
        res.status(500).json({ status: 'error', payload: error.message });
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ status: 'error', payload: 'ID de producto es requerido' });
    }

    try {
        const result = await getProductsServiceById(id);
        res.status(200).json({ status: 'success', ...result });
    } catch (error) {
        res.status(500).json({ status: 'error', payload: error.message });
    }
};
