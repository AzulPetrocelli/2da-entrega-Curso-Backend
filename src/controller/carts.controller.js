import * as cs from '../services/carts.service.js';

//Obtengo todos los carritos
export const getCarts = async (req, res) => {
    try {
        const result = await cs.getCartsService(req);
        res.status(200).json({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', payload: error.message });
    }
};

//Obtengo un carrito por ID
export const getCartById = async (req, res) => {
    const { cid } = req.params;

    if (!cid) {
        return res.status(400).json({ status: 'error', payload: 'ID de carrito es requerido' });
    }

    try {
        const result = await cs.getCartByIdService(cid);

        if (!result) {
            return res.status(404).json({ status: 'error', payload: 'Carrito no encontrado' });
        }

        res.status(200).json({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', payload: error.message });
    }
};

//Creo un carrito
export const postCart = async (req, res) => {
    try {
        const result = await cs.postCartService(req.body);
        res.status(201).json({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', payload: error.message });
    }
};

//Actualizo un carrito completo por ID
export const putCart = async (req, res) => {
    const { cid } = req.params;

    if (!cid) {
        return res.status(400).json({ status: 'error', payload: 'ID de carrito es requerido' });
    }

    try {
        const result = await cs.putCartService(cid, req.body);

        if (!result) {
            return res.status(404).json({ status: 'error', payload: 'Carrito no encontrado' });
        }

        res.status(200).json({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', payload: error.message });
    }
};

//Actualizo la cantidad de un producto en un carrito
export const updateProductQuantityInCart = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (!cid || !pid) {
        return res.status(400).json({ status: 'error', payload: 'ID de carrito y producto son requeridos' });
    }

    if (quantity === undefined || quantity === 0) {
         return res.status(400).json({ status: 'error', payload: 'Cantidad válida es requerida' });
    }

    try {
        const result = await cs.updateProductQuantityInCartService(cid, pid, quantity);

        if (!result) {
            return res.status(404).json({ status: 'error', payload: 'Carrito o producto no encontrado' });
        }

        res.status(200).json({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', payload: error.message });
    }
};

//Agrego un producto a un carrito
export const addProductToCart = async (req, res) => {
    const { cid } = req.params;

    if (!cid) {
        return res.status(400).json({ status: 'error', payload: 'ID de carrito es requerido' });
    }

    const cart = await cs.getCartByIdService(cid);

    if (!cart) {
        return res.status(404).json({ status: 'error', payload: 'Carrito no encontrado' });
    }

    try {
        const result = await cs.addProductToCartService(cid, req.body);
        res.status(200).json({ status: 'success', payload: result });
    } catch (error) {
        res.status(400).json({ status: 'error', payload: error.message });
    }
};

//Elimino un producto de un carrito
export const removeProductFromCart = async (req, res) => {
    const { cid, pid } = req.params;

    if (!cid || !pid) {
        return res.status(400).json({ status: 'error', payload: 'ID de carrito y producto son requeridos' });
    }

    try {
        const result = await cs.removeProductFromCartService(cid, pid);

        if (!result) {
            return res.status(404).json({ status: 'error', payload: 'Carrito no encontrado' });
        }

        res.status(200).json({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', payload: error.message });
    }
};

//Elimino todos los productos de un carrito
export const clearCart = async (req, res) => {
    const { cid } = req.params;

    if (!cid) {
        return res.status(400).json({ status: 'error', payload: 'ID de carrito es requerido' });
    }

    try {
        const result = await cs.clearCartService(cid);

        if (!result) {
            return res.status(404).json({ status: 'error', payload: 'Carrito no encontrado' });
        }

        res.status(200).json({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', payload: error.message });
    }
};

//Elimino un carrito por ID
export const deleteCart = async (req, res) => {
    const { cid } = req.params;

    if (!cid) {
        return res.status(400).json({ status: 'error', payload: 'ID de carrito es requerido' });
    }

    try {
        const result = await cs.deleteCartService(cid);

        if (!result) {
            return res.status(404).json({ status: 'error', payload: 'Carrito no encontrado' });
        }

        res.status(200).json({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', payload: error.message });
    }
};
