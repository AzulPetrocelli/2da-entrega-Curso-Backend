function showConfirmModal(title = '¿Estás seguro?', message = 'Esta acción no se puede deshacer.') {
    return new Promise((resolve) => {
        const modal = document.getElementById('confirm-modal');
        const modalContent = modal.querySelector('div.bg-gray-800');
        const titleEl = document.getElementById('confirm-modal-title');
        const messageEl = document.getElementById('confirm-modal-message');
        const btnCancel = document.getElementById('confirm-modal-cancel');
        const btnAccept = document.getElementById('confirm-modal-accept');

        titleEl.textContent = title;
        messageEl.textContent = message;

        // Mostrar el modal
        modal.classList.remove('hidden');
        
        // Animacion de entrada
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                modal.classList.remove('opacity-0');
                modal.classList.add('opacity-100');
                modalContent.classList.remove('scale-95');
                modalContent.classList.add('scale-100');
            });
        });

        // Funcion para limpiar la animacion y resolver
        const cleanup = (result) => {
            modal.classList.remove('opacity-100');
            modal.classList.add('opacity-0');
            modalContent.classList.remove('scale-100');
            modalContent.classList.add('scale-95');
            
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300);
            
            btnCancel.removeEventListener('click', onCancel);
            btnAccept.removeEventListener('click', onAccept);
            
            resolve(result);
        };

        const onCancel = () => cleanup(false);
        const onAccept = () => cleanup(true);

        btnCancel.addEventListener('click', onCancel);
        btnAccept.addEventListener('click', onAccept);
    });
}