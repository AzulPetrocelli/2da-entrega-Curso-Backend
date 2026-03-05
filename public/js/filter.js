document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    
    //Valido que los campos de la url tengan información y los muestro en el formulario
    if(params.has('name')) document.getElementById('filter-name').value = params.get('name');
    if(params.has('minPrice')) document.getElementById('filter-minPrice').value = params.get('minPrice');
    if(params.has('maxPrice')) document.getElementById('filter-maxPrice').value = params.get('maxPrice');
    if(params.has('available') && params.get('available') === 'true') {
        document.getElementById('filter-available').checked = true;
    }
    if(params.has('sort')) document.getElementById('filter-sort').value = params.get('sort');

    const selectedCategories = params.getAll('categories');
    if (selectedCategories.length > 0) {
        document.querySelectorAll('.filter-category').forEach(checkbox => {
            if (selectedCategories.includes(checkbox.value)) {
                checkbox.checked = true;
            }
        });
    }
});

function applyFilters() {
    const form = document.getElementById('filterForm');
    const formData = new FormData(form);                    //Paso a un formData la info del formulario
    const params = new URLSearchParams();                   //Creo un objeto para manejar los parámetros de la URL

    //Valido que los campos no estén vacíos y los agrego a los parámetros de la URL
    const name = formData.get('name');                      
    if (name && name.trim() !== '') params.append('name', name.trim()); 

    const minPrice = formData.get('minPrice');
    if (minPrice && minPrice.trim() !== '') params.append('minPrice', minPrice.trim());

    const maxPrice = formData.get('maxPrice');
    if (maxPrice && maxPrice.trim() !== '') params.append('maxPrice', maxPrice.trim());

    formData.getAll('categories').forEach(cat => {
        params.append('categories', cat);
    });

    const available = formData.get('available');
    if (available === 'on') params.append('available', 'true');

    const sort = formData.get('sort');
    if (sort && sort !== '') params.append('sort', sort);

    //Redirijo a la página principal con los parámetros en la URL
    window.location.href = `/?${params.toString()}`;
}

function clearFilters() {
    //Redirijo a la página principal sin parámetros
    window.location.href = '/';
}