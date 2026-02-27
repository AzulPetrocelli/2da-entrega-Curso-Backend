import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    title: { type: String, lowercase: true },
    description: String,
    price: Number,
    code: String,
    stock: Number,
    status: String,
    category: [String],
    thumbnails: String,
});

export default model('products', productSchema);
