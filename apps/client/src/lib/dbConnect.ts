import mongoose from "mongoose";

let alreadyConnected = false;

export const ensureDbConnected = async () => {
    if (!alreadyConnected) {
        await mongoose.connect(process.env.MONGO_URL as string, {
            dbName: "Course_with_recoil"
        });
        alreadyConnected = true;
    }
}; 