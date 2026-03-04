/**
 * Valida que los campos requeridos del objeto.
 * Lanza un error si falta algún campo.
 * @param {Object} data - Objeto a validar.
 * @param {Array<String>} requiredFields - Lista de atributos requeridos del objeto.
 */
export const validateRequiredFields = (data, requiredFields = []) => {
    const missingFields = requiredFields.filter((field) => {
        const value = data[field];
        return value === undefined || value === null || value === '';
    });

    if (missingFields.length > 0) {
        throw new Error(`Los siguientes campos son requeridos: ${missingFields.join(', ')}`);
    }
};
