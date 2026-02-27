import mongoose from 'mongoose';

const username = 'azul';
const password = '11042003';

const mongodb_uri = 'mongodb+srv://' + username + ':' + password + '@coderhouse.lhregrq.mongodb.net/?appName=Coderhouse';

const dbConnect = async () => {
    try {
        await mongoose.connect(mongodb_uri);
        console.log('Base de datos conectada');
    } catch (error) {
        console.error(error);
    }
};

export default dbConnect;
