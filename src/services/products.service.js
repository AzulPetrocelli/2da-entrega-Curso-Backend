import Product from '../models/products.model.js';

export const getProductsService = async (req) => {
    let { limit = 10, page = 1, sort, query } = req.query;

    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);

    let filter = {};
    if (query) {
        filter = { $or: [{ category: query }, { status: query }] };
    }

    const totalDocs = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalDocs / parsedLimit);

    const sortOptions = sort ? { price: sort === 'asc' ? 1 : -1 } : {};

    const products = await Product.find(filter)
        .limit(parsedLimit)
        .skip((parsedPage - 1) * parsedLimit)
        .sort(sortOptions);

    const hasPrevPage = parsedPage > 1;
    const hasNextPage = parsedPage < totalPages;

    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl}`;
    let prevLink = null;
    let nextLink = null;

    if (hasPrevPage) {
        prevLink = `${baseUrl}?limit=${parsedLimit}&page=${parsedPage - 1}${sort ? `&sort=${sort}` : ''}${query ? `&query=${encodeURIComponent(query)}` : ''}`;
    }

    if (hasNextPage) {
        nextLink = `${baseUrl}?limit=${parsedLimit}&page=${parsedPage + 1}${sort ? `&sort=${sort}` : ''}${query ? `&query=${encodeURIComponent(query)}` : ''}`;
    }

    return {
        payload: products,
        totalPages,
        prevPage: hasPrevPage ? parsedPage - 1 : null,
        nextPage: hasNextPage ? parsedPage + 1 : null,
        page: parsedPage,
        hasPrevPage,
        hasNextPage,
        prevLink,
        nextLink,
    };
};

export const getProductsServiceById = async (id) => {
    const product = await Product.find({ _id: {$eq: id} });

    return product;
};

export const postProductService = async (productData) => {
    const { name, description, price, code, stock, status, category, thumbnails } = productData;

    const product = {
        name,
        description,
        price,
        code,
        stock,
        status,
        category,
        thumbnails,
    };

    if (Object.values(product).some((value) => value === undefined || value === null || value === '')) {
        throw new Error('Todos los campos son requeridos');
    }

    const newProduct = await Product.create(productData);

    return newProduct;
};

export const putProductService = async (pid, updateData) => {
    const { name, description, price, code, stock, status, category, thumbnails } = updateData;

    const product = {
        name,
        description,
        price,
        code,
        stock,
        status,
        category,
        thumbnails,
    };

    if (Object.values(product).some(value => value === undefined || value === null || value === '')) {
        throw new Error('Todos los campos son requeridos');
    }

    const productUpdated = await Product.findByIdAndUpdate(
        pid,
        { $set: product },
        { new: true } 
    );

    return productUpdated;
};

export const deleteProductService = async (pid) => {
    const productDeleted = await Product.findByIdAndDelete({ _id: pid });

    return productDeleted;
};
