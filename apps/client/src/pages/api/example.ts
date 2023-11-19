import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import { NextApiRequest, NextApiResponse } from "next"

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions)
    if (session) {
        // Signed in
        console.log("hello")
        console.log("Session", JSON.stringify(session, null, 2))
    } else {
        // Not Signed in
        console.log("session")
        res.status(401).json({ message: "hi there" })
    }
    res.end()
}