import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { User } from "db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)
    try {
        if (session) {
            const user = await User.findOne({ username: session.user?.name });
            if (user) {
                const purchasedCourses = user.purchasedCourses;
                res.json({ message: purchasedCourses, msg: "hello" })
            } else {
                res.json({ message: "recheck user credentials" })
            }
        } else {
            res.status(403).json({ message: "not logged in" })
        }
    } catch (error) {
        console.log(error)
        res.send(error)
    }

}