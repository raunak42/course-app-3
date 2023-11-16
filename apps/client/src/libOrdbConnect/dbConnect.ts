import mongoose from "mongoose";

let alreadyConnected = false;

export const ensureDbConnected = async () => {
    if (!alreadyConnected) {
        await mongoose.connect(
            "mongodb+srv://RaunakA_:QTbajjyxdQEZMJDf@cluster0.ivcfy9f.mongodb.net/",
            {
                dbName: "Course_with_recoil"
            }
        );
        alreadyConnected = true;
    }
};