import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: { type: String, require: true, lowercase: true },
        price: { type: Number, require: true },
        description: { type: String, require: true },
        code: { type: String, require: true },
        stock: { type: Number, require: true },
        status: { type: String, require: true },
        category: [String],
        thumbnails: String,
    },
    { versionKey: false } // Evita que Mongoose genere el campo __v
);

export default mongoose.model('Products', productSchema);
