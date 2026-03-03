import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'Products' },
            quantity: Number,
        },
    ],
});

export default model('Carts', cartSchema);
