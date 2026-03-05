const removeFromCart = async (cid, pid) => {
    const confirmed = await showConfirmModal('Eliminar producto', '¿Seguro que deseas remover este producto de su carrito?');
    if(!confirmed) return;
    
    try {
        const response = await fetch(`/api/carts/${cid}/products/${pid}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            window.location.reload();
        } else {
            const data = await response.json();
            showToast('Error al eliminar producto', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error de red al eliminar.', 'error');
    }
}

const updateQuantity = async (cid, pid, newQuantity) => {
    try {
        const response = await fetch(`/api/carts/${cid}/products/${pid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ quantity: newQuantity })
        });
        
        if (response.ok) {
            window.location.reload();
        } else {
            const data = await response.json();
            showToast('Error al actualizar cantidad', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error en la red', 'error');
    }
}

const clearCart = async (cid) => {
    const confirmed = await showConfirmModal('Vaciar carrito', '¿Estás completamente seguro de que quieres vaciar todo el carrito?');
    if(!confirmed) return;
    
    try {
        const response = await fetch(`/api/carts/${cid}/clear`, { 
            method: 'DELETE'
        });
        
        if (response.ok) {
            window.location.reload();
        } else {
            const res2 = await fetch(`/api/carts/${cid}`, { method: 'DELETE' });
            if(res2.ok) window.location.reload();
            else showToast('Error al vaciar carrito', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showToast('Error en la red al vaciar carrito', 'error');
    }
}

// Integración para Agregar al Carrito
const CART_ID = "69a7a6b91d450e5387aeedf3"; // Integración para Agregar al Carrito --> por ahora lo harcodeo ya que no tengo hecho un login como para seleccionar el carrito del usuario

async function addToCart(pid) {
    try {
        const response = await fetch(`/api/carts/${CART_ID}/products/${pid}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId: pid, quantity: 1 })
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