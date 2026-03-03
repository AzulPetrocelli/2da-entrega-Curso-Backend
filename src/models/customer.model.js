import { Schema, model } from 'mongoose';

const customerSchema = new Schema({
	first_name: { type: String, lowercase: true, indexed: true },
	last_name: { type: String, lowercase: true },
	email: { type: String, unique: true, lowercase: true },
});

export default model('Customers', customerSchema);
