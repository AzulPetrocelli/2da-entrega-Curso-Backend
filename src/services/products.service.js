import Product from '../models/products.model.js';

export const getProductsService = async (req) => {
    let { limit = 10, page = 1, sort, query, name, minPrice, maxPrice, categories, available } = req.query;

    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);

    let filter = {};
    if (query) {
        filter = { $or: [{ category: query }, { status: query }] };
    }

    if (name) {
        filter.name = { $regex: name, $options: 'i' };
    }

    if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) {
            filter.price.$gte = Number(minPrice);
        } else if (maxPrice) {
            filter.price.$gte = 0;
        }
        if (maxPrice) {
            filter.price.$lte = Number(maxPrice);
        }
    }

    if (categories) {
        const categoriesArray = Array.isArray(categories) ? categories : [categories];
        if (categoriesArray.length > 0) {
            filter.category = { $in: categoriesArray };
        }
    }

    if (available === 'true' || available === 'on') {
        filter.status = 'true';
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

    const buildQueryString = (pageNum) => {
        let qs = `?limit=${parsedLimit}&page=${pageNum}`;
        if (sort) qs += `&sort=${sort}`;
        if (query) qs += `&query=${encodeURIComponent(query)}`;
        if (name) qs += `&name=${encodeURIComponent(name)}`;
        if (minPrice) qs += `&minPrice=${minPrice}`;
        if (maxPrice) qs += `&maxPrice=${maxPrice}`;
        if (categories) {
            const catArr = Array.isArray(categories) ? categories : [categories];
            catArr.forEach(c => qs += `&categories=${encodeURIComponent(c)}`);
        }
        if (available) qs += `&available=${available}`;
        return qs;
    };

    if (hasPrevPage) {
        prevLink = `${baseUrl}${buildQueryString(parsedPage - 1)}`;
    }

    if (hasNextPage) {
        nextLink = `${baseUrl}${buildQueryString(parsedPage + 1)}`;
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
