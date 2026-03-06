import * as ps from '../services/products.service.js';

//Obtengo todos los productos
export const getProducts = async (req, res) => {
    try {
        const result = await ps.getProductsService(req);
        res.render('products', result);
        res.status(200).json({ status: 'success', ...result });
    } catch (error) {
        res.status(500).json({ status: 'error', payload: error.message });
    }
};

//Obtengo un producto por ID
export const getProductById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ status: 'error', payload: 'ID de producto es requerido' });
    }

    try {
        const result = await ps.getProductsServiceById(id);

        if (!result) {
            return res.status(404).json({ status: 'error', payload: 'Producto no encontrado' });
        }

        res.status(200).json({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', payload: error.message });
    }
};

//Agrego un producto
export const postProduct = async (req, res) => {
    try {
        const result = await ps.postProductService(req.body);
        res.status(201).json({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', payload: error.message });
    }
};

//Actualizo un producto por ID
export const putProduct = async (req, res) => {
    const { pid } = req.params;

    if (!pid) {
        return res.status(400).json({ status: 'error', message: 'ID de producto es requerido' });
    }

    const product = await ps.getProductsServiceById(pid);

    if (!product) {
        return res.status(404).json({ status: 'error', payload: 'El id ingresaro no corresponde a ningun Producto' });
    }

    try {
        const result = await ps.putProductService(pid, req.body);

        res.status(200).json({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', payload: error.message });
    }
};

//Elimino un producto por ID
export const deleteProduct = async (req, res) => {
    const { pid } = req.params;

    try {
        const result = await ps.deleteProductService(pid);

        res.status(200).json({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', payload: error.message });
    }
};
