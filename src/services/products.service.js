import Product from '../models/products.model.js';

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

    return product;
};

export const postProductService = async (productData) => {
    const { title, description, price, code, stock, status, category, thumbnails } = productData;

    const product = {
        title,
        description,
        price,
        code,
        stock,
        status,
        category,
        thumbnails,
    };

    if (Object.values(product).some((value) => value === undefined || value === null || value === '')) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const newProduct = await Product.create(productData);

    return newProduct;
};

export const putProductService = async (pid, updateData) => {
    const { title, description, price, code, stock, status, category, thumbnails } = updateData;

    const product = {
        title,
        description,
        price,
        code,
        stock,
        status,
        category,
        thumbnails,
    };

    if (Object.values(product).some((value) => value === undefined || value === null || value === '')) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const productUpdated = await Product.findByIdAndUpdate({ _id: pid }, { $set: product });

    return productUpdated;
};

export const deleteProductService = async (pid) => {
    const productDeleted = await Product.findByIdAndDelete({ _id: pid });

    return productDeleted;
};
