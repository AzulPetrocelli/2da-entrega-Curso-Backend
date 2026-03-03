import * as ps from '../services/products.service.js';

export const getProducts = async (req, res) => {
    try {
        const result = await ps.getProductsService(req);
        res.render('products', result);
        res.status(200).json({ status: 'success', ...result });
    } catch (error) {
        res.status(500).json({ status: 'error', payload: error.message });
    }
};

export const getProductById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ status: 'error', payload: 'ID de producto es requerido'  });
    }

    try {
        const result = await ps.getProductsServiceById(id);

        if (!result) {
            return res.status(404).json({ status: 'error', payload: 'Producto no encontrado' });
        }

        res.status(200).json({ status: 'success', ...result });
    } catch (error) {
        res.status(500).json({ status: 'error', payload: error.message });
    }
};

export const getProductsByField = async (req, res) => {
    const { field } = req.params;
    const { value } = req.query;

    if (!field || !value) {
        return res.status(400).json({ status: 'error', payload: 'Campo y valor son requeridos' });
    }

    try {
        const result = await ps.getProductsService({ query: { [field]: value } });
        res.status(200).json({ status: 'success', ...result });
    } catch (error) {
        res.status(500).json({ status: 'error', payload: error.message });
    }
};

export const postProduct = async (req, res) => {
    try {
        const result = await ps.postProductService(req.body);
        res.status(201).json({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', payload: error.message });
    }
};

export const putProduct = async (req, res) => {
    const { pid } = req.params;

    if (!pid) {
        return res.status(400).json({ status: 'error', message: 'ID de producto es requerido'  });
    }

    try {
        const result = await ps.putProductService(pid, req.body);

        res.status(200).json({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', payload: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { pid } = req.params;

    try {
        const result = await ps.deleteProductService(pid);

        res.status(200).json({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', payload: error.message });
    }
};
