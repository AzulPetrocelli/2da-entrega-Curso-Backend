import Product from '../models/product.model.js';

export const getProductsService = async (req) => {
    const { limit = 10, page = 1, sort, query = {} } = req.query;

    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);

    const totalDocs = await Product.countDocuments(query);
    const totalPages = Math.ceil(totalDocs / parsedLimit);

    const products = await Product.find(query)
        .limit(parsedLimit)
        .skip((parsedPage - 1) * parsedLimit)
        .sort(sort ? { price: sort === 'asc' ? 1 : -1 } : {});

    return {
        payload: products,
        totalPages,
        page: parsedPage,
        prevPage: parsedPage > 1 ? parsedPage - 1 : null,
        nextPage: parsedPage < totalPages ? parsedPage + 1 : null,
        hasPrevPage: parsedPage > 1,
        hasNextPage: parsedPage < totalPages,
    };
};

export const getProductsServiceById = async (id) => {
    const product = await Product.findById(id);

    if (!product) {
        throw new Error('Producto no encontrado');
    }

    return { payload: product };
};
