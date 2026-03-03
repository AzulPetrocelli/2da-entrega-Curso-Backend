import mongoose from 'mongoose';

const mongodb_uri = "mongodb+srv://azul:11042003@coderhouse.j06l3vg.mongodb.net/proyecto_final?appName=Coderhouse"

const dbConnect = async () => {
    try {
        await mongoose.connect(mongodb_uri);
        console.log('Base de datos conectada');
    } catch (error) {
        console.error(error);
    }
};

export default dbConnect;
