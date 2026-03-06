import { Schema, model } from 'mongoose';

const cartSchema = new Schema(
    {
        products: [
            {
                _id: false, // evita _id en subdocumentos
                product: { type: Schema.Types.ObjectId, ref: 'Products' },
                quantity: Number,
            },
        ],
    },
    { versionKey: false }
);

export default model('Carts', cartSchema);
