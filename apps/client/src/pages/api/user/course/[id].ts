import { User } from "db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { ensureDbConnected } from "@/lib/dbConnect";
import mongoose from "mongoose";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const courseId = (req.query.id);
        const session = await getServerSession(req, res, authOptions);
        if (session) {
            await ensureDbConnected();
            const user = await User.findOne({ username: session.user?.name });
            const purchasedCourses = user.purchasedCourses;
            const course = purchasedCourses.find((t: mongoose.Types.ObjectId) => t.toString() === courseId);
            if (course) {
                res.json({ message: "already purchased the course" })
            } else {
                purchasedCourses.push(courseId);
                await user.save();
                res.json({ message: "course successfully purchased" })
            }
        } else {
            res.status(403).json({ message: "not logged in" })
        }
    } catch (error) {
        res.json({ message: error })
    }
}