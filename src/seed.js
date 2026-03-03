import mongoose from "mongoose";
import { fakerES_MX as faker } from "@faker-js/faker"
import Customer from "./models/customer.model.js";
import Product from "./models/products.model.js";
import Order from "./models/order.model.js";
import Cart from "./models/carts.model.js";

const username = 'azul';
const password = '11042003';
const dbName = 'proyecto_final';
const connectionString = 'mongodb+srv://' + username + ':' + password + '@coderhouse.lhregrq.mongodb.net/' + dbName + '?appName=Cluster0';

const seedDB = async ()=> {
    try {
        await mongoose.connect(connectionString);
        console.log("Conectado a MongoDB");
        process.exit(1);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}
