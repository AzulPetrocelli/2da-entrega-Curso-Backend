import * as cs from '../services/carts.service.js';

export const getCarts = async (req, res) => {
    try {
        const result = await cs.getCartsService(req);
        res.status(200).json({ status: 'success', ...result });
    } catch (error) {
        res.status(500).json({ status: 'error', payload: error.message });
    }
};

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

export const postCart = async (req, res) => {
    try {
        const result = await cs.postCartService(req.body);
        res.status(201).json({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).json({ status: 'error', payload: error.message });
    }
};

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

export const addProductToCart = async (req, res) => {
    const { cid } = req.params;

    if (!cid) {
        return res.status(400).json({ status: 'error', payload: 'ID de carrito es requerido' });
    }

    try {
        const result = await cs.addProductToCartService(cid, req.body);
        res.status(200).json({ status: 'success', payload: result });
    } catch (error) {
        res.status(400).json({ status: 'error', payload: error.message });
    }
};

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
