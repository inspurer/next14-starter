import mongoose from "mongoose"

const connection = {};

export const connectToDb = async () => {
    try {
        if (connection.isConnected) {
            console.log("Using existing connection");
            return;
        }
        // console.log(process.env.MONGO)
        const db = await mongoose.connect(process.env.MONGO);
        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.log("db connect error")
        console.log(error);
        throw new Error(error);
    }
};