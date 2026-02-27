import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'products' },
            quantity: Number,
        },
    ],
});

export default model('carts', cartSchema);
