import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    title: { type: String, require: true, lowercase: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    code: { type: String, require: true },
    stock: { type: Number, require: true },
    status: { type: String, require: true },
    category: [String],
    thumbnails: String,
});

export default mongoose.model('products', productSchema);
