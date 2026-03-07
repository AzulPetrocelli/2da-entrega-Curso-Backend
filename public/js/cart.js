//Funcion que remueve la vista del producto y el carrito en caso de que no queden productos
const removeProductView = (pid) => {
    const productElement = document.getElementById(`product-${pid}`);

    if (productElement) {
        productElement.remove();
    }

    const remainingProducts = document.querySelectorAll('[id^="product-"]');
    if (remainingProducts.length === 0) {
        removeCartView();
    }
};

//Remuevo la vista del carrito y la reemplazo con el cartel de cart empty
const removeCartView = () => {
    const containerProducts = document.getElementById('cart-products-container');
    const cartEmptyAlert = document.getElementById('cart-empty-alert');

    containerProducts.remove();
    cartEmptyAlert.classList.remove('invisible');
};

const removeProductFromCart = async (cid, pid) => {
    const confirmed = await showConfirmModal('Eliminar producto', '¿Seguro que deseas remover este producto de su carrito?');
    if (!confirmed) return;

    try {
        const response = await fetch(`/api/carts/${cid}/products/${pid}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            removeProductView(pid);
            showToast('Producto eliminado', 'success');
        } else {
            const data = await response.json();
            showToast('Error al eliminar producto', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error de red al eliminar.', 'error');
    }
};

const updateProductQuantity = async (cid, pid, quantity) => {
    try {
        const response = await fetch(`/api/carts/${cid}/products/${pid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity }),
        });

        if (response.ok) {
            //Cambio la vista de la cantidad
            const productElement = document.getElementById(`product-${pid}`);
            const quantytyView = productElement.querySelector('input');

            let oldQuantity = parseInt(quantytyView.value);
            let newQuantity = oldQuantity + quantity;

            if (newQuantity === 0) removeProductView(pid);
            else quantytyView.value = newQuantity;
        } else {
            const data = await response.json();
            showToast('Error al actualizar cantidad', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error en la red', 'error');
    }
};

const clearCart = async (cid) => {
    const confirmed = await showConfirmModal('Vaciar carrito', '¿Estás completamente seguro de que quieres vaciar todo el carrito?');
    if (!confirmed) return;

    try {
        const response = await fetch(`/api/carts/${cid}/clear`, {
            method: 'DELETE',
        });

        if (response.ok) {
            removeCartView();
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error en la red al vaciar carrito', 'error');
    }
};

// Integración para Agregar al Carrito
const CART_ID = '69a7a6b91d450e5387aeedf3'; // Integración para Agregar al Carrito --> por ahora lo harcodeo ya que no tengo hecho un login como para seleccionar el carrito del usuario

async function addToCart(pid) {
    try {
        const response = await fetch(`/api/carts/${CART_ID}/products/${pid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId: pid, quantity: 1 }),
        });

        if (response.ok) {
            showToast('Producto agregado al carrito exitosamente');
        } else {
            const data = await response.json();
            showToast('Error al agregar el producto', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error en la red', 'error');
    }
}
