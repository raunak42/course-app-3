import { Course } from "db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // try {
    //     const session = await getServerSession(req, res, authOptions)
    //     if (session) {
    //         const courses = await Course.find();
    //         res.json({ message: courses })
    //     } else {
    //         res.status(413).json({ message: "session inactive" })
    //     }
    // } catch (error) {
    //     res.json({ message: error })
    // }
    const courses = await Course.find();
    res.json({ message: courses })

}