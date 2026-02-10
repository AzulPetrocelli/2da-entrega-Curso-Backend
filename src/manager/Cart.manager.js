export class CartManager {
    constructor (carts) {
        this.carts = carts;
    }

    createCart(products) {
        const newCart = {
            id: this.carts.length + 1,
            products: products || []
        };
        this.carts.push(newCart);
        return {cart:newCart, status:200};
    }

    getCartById(id) {
        const cart = this.carts.find((cart) => cart.id === id);
        if (cart) {
            return {cart:cart, status:200};
        } else {
            return {error:'Cart not found', status:404};
        }
    }

    getProductsCartById(id) {
        return this.carts.find((cart) => cart.id === id).products;
    }

    addProductToCart(cartId, productId) {
        const cart = this.getCartById(cartId).cart;
        if (cart) {
            const product = cart.products.find((product) => product.product === productId);
            if (product) {
                const productInCartIndex = cart.products.findIndex((p) => p.product === productId);
                if (productInCartIndex !== -1) {
                    cart.products[productInCartIndex] = {product: productId, quantity: cart.products[productInCartIndex].quantity + 1};
                } else {
                    cart.products.push({product: productId, quantity: 1});
                }

                return {product: cart.products, status: 200};
            } else {
                return {error: 'Product not found', status: 404};
            }
        } else {
            return {error: 'Cart not found', status: 404};
        }
    }

    patchProductInCart(cartId, productId) {
        const cart = this.getCartById(cartId);
        if (cart) {
            const productIndex = cart.products.findIndex((product) => product.product.id === productId);
            if (productIndex !== -1) {
                cart.products[productIndex].quantity++;
                return {product: cart.products[productIndex], status: 200};
            } else {
                return {error: 'Product not found', status: 404};
            }
        } else {
            return {error: 'Cart not found', status: 404};
        }
    }
}