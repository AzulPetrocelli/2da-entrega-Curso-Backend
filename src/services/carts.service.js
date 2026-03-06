import Cart from '../models/carts.model.js';
import Product from '../models/products.model.js';

//Obtengo todos los carritos con paginación y populate
export const getCartsService = async (req) => {
    //Me trae el producto completo, no solo el ID
    const carts = await Cart.find();

    return carts;
};

//Obtengo un carrito por ID con populate
export const getCartByIdService = async (id) => {
    const cart = await Cart.findById(id).populate('products.product');

    return cart;
};

//Creo un carrito
export const postCartService = async (req) => {
    const { products = [] } = req.body;

    const processedProducts = [];

    for (const product of products) {
        const productData = await Product.findById(product.product);
        if (!productData) {
            throw new Error(`Producto con ID ${product.product} no encontrado`);
        }

        processedProducts.push({
            product: product.product,
            quantity: product.quantity,
        });
    }

    const cart = {
        products: processedProducts,
    };

    const newCart = await Cart.create(cart);

    return newCart.populate('products.product');
};

//Agrego un producto al carrito
export const addProductToCartService = async (req) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    if (!pid || !quantity) {
        throw new Error('productId y quantity son requeridos');
    }

    const productSelected = await Product.findById(pid);

    if (!productSelected) {
        throw new Error('Producto no encontrado');
    }

    if (!productSelected.price || isNaN(productSelected.price)) {
        throw new Error('El producto no tiene un precio válido');
    }

    const cart = await Cart.findById(cid);
    if (!cart) {
        throw new Error('Carrito no encontrado');
    }
    const productInTheCart = cart.products.find((p) => p.product.toString() === pid);

    if (productInTheCart) {
        productInTheCart.quantity += quantity;
    } else {
        cart.products.push({
            product: pid,
            quantity,
        });
    }

    const updatedCart = await cart.save();

    return updatedCart.populate('products.product');
};

//Actualizo un carrito por ID
export const putCartService = async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;

    const cartUpdated = await Cart.findByIdAndUpdate(cid, { $set: { products: products } }, { new: true });

    return cartUpdated;
};

//Actualizo la cantidad de un producto en el carrito
export const updateProductQuantityInCartService = async (cid, productId, quantity) => {
    const cart = await Cart.findById(cid);
    if (!cart) {
        throw new Error('Carrito no encontrado');
    }

    const productInCart = cart.products.find((p) => p.product.toString() === productId);

    if (!productInCart) {
        throw new Error('Producto no encontrado en el carrito');
    }

    productInCart.quantity += quantity;
    await cart.save();

    return cart;
};

//Elimino un producto del carrito
export const removeProductFromCartService = async (cid, productId) => {
    if (!productId) {
        throw new Error('productId es requerido');
    }

    const cartUpdated = await Cart.findByIdAndUpdate({ _id: cid }, { $pull: { products: { product: productId } } }, { new: true }).populate('products.product');

    return cartUpdated;
};

//Limpio el carrito
export const clearCartService = async (cid) => {
    const cartUpdated = await Cart.findByIdAndUpdate({ _id: cid }, { $set: { products: [] } }, { new: true });

    return cartUpdated;
};

//Elimino un carrito por ID
export const deleteCartService = async (cid) => {
    const cartDeleted = await Cart.findByIdAndDelete({ _id: cid });

    return cartDeleted;
};
