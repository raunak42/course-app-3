import { ensureDbConnected } from "@/lib/dbConnect";
import { User } from "db";
import { NextApiRequest, NextApiResponse } from "next";
import { signupInput } from "validation";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await ensureDbConnected();
    const parsedInput = signupInput.safeParse(req.body)
    if (parsedInput.success) {
        const username = parsedInput.data.username;
        const password = parsedInput.data.password;
        const user = await User.findOne({ username, password });
        if (user) {
            res.status(409).json({ message: "username taken" })
        } else {
            const newUser = new User({ username, password });
            await newUser.save();
            res.status(200).json({ message: "successfully signed up" })
        }
    } else {
        res.status(411).json({ message: parsedInput.error })
    }
}