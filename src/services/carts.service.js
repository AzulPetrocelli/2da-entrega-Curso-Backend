import Cart from '../models/carts.model.js';
import Product from '../models/products.model.js';

export const getCartsService = async (req) => {
    const { limit = 10, page = 1 } = req.query;

    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);

    const totalDocs = await Cart.countDocuments();
    const totalPages = Math.ceil(totalDocs / parsedLimit);

    const carts = await Cart.find()
        .limit(parsedLimit)
        .skip((parsedPage - 1) * parsedLimit)
        .populate('products.product');

    return {
        payload: carts,
        totalPages,
        page: parsedPage,
        prevPage: parsedPage > 1 ? parsedPage - 1 : null,
        nextPage: parsedPage < totalPages ? parsedPage + 1 : null,
        hasPrevPage: parsedPage > 1,
        hasNextPage: parsedPage < totalPages,
    };
};

export const getCartByIdService = async (id) => {
    const cart = await Cart.findById(id).populate('products.product');

    return cart;
};

export const postCartService = async (cartData) => {
    const { products = [] } = cartData;

    const cart = {
        products,
    };

    const newCart = await Cart.create(cart);

    return newCart;
};

export const putCartService = async (cid, updateData) => {
    const { products } = updateData;

    if (!products || !Array.isArray(products)) {
        throw new Error('Los productos deben ser un array');
    }

    const cartUpdated = await Cart.findByIdAndUpdate({ _id: cid }, { $set: { products } }, { new: true }).populate('products.product');

    return cartUpdated;
};

export const updateProductQuantityInCartService = async (cid, productId, quantity) => {
    const cart = await Cart.findById(cid);
    if (!cart) {
        throw new Error('Carrito no encontrado');
    }

    const productInCart = cart.products.find(p => p.product.toString() === productId);
    
    if (!productInCart) {
        throw new Error('Producto no encontrado en el carrito');
    }

    productInCart.quantity += quantity;
    await cart.save();
    
    return cart;
};

export const deleteCartService = async (cid) => {
    const cartDeleted = await Cart.findByIdAndDelete({ _id: cid });

    return cartDeleted;
};

export const addProductToCartService = async (cid, productData) => {
    const { productId, quantity } = productData;

    //Valido que el productId y quantity(cantidad de unidades a agregar) sean enviados, si no lo son lanzo error
    if (!productId || !quantity) {
        throw new Error('productId y quantity son requeridos');
    }

    //Valido que el producto exista, si no existe lanzo error
    const productSelected = await Product.findById(productId);
    if (!productSelected) {
        throw new Error('Producto no encontrado');
    }

    //Valido que el id del carrito exista, si no existe lanzo error
    const cart = await Cart.findById(cid);
    if (!cart) {
        throw new Error('Carrito no encontrado');
    }

    //Valido si el producto ya existe en el carrito, si es así sumo la cantidad, sino lo agrego como nuevo producto
    const existingProduct = cart.products.find((p) => p.product.toString() === productId);

    if (existingProduct) {
        existingProduct.quantity += quantity;
    } else {
        cart.products.push({ product: productId, quantity });
    }

    const updatedCart = await cart.save();

    return updatedCart.populate('products.product');
};

export const removeProductFromCartService = async (cid, productId) => {
    if (!productId) {
        throw new Error('productId es requerido');
    }

    const cartUpdated = await Cart.findByIdAndUpdate({ _id: cid }, { $pull: { products: { product: productId } } }, { new: true }).populate('products.product');

    return cartUpdated;
};

export const clearCartService = async (cid) => {
    const cartUpdated = await Cart.findByIdAndUpdate({ _id: cid }, { $set: { products: [] } }, { new: true });

    return cartUpdated;
};
