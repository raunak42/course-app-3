import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { User } from "db";
import GoogleProvider from "next-auth/providers/google"
import { Provider } from "next-auth/providers/index";
import { signupInput } from "validation";
import { ensureDbConnected } from "@/lib/dbConnect";
import { redirect } from "react-router-dom";

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: "credentials",
            type: "credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password", placeholder: "password" },
            },
            async authorize(credentials, req) {
                await ensureDbConnected();
                if (!credentials) {
                    // If you return null then an error will be displayed advising the user to check their details.
                    // Any object returned will be saved in `user` property of the JWT. "user" is an object within the session object.
                    return null;
                } else {
                    const parsedInput = signupInput.safeParse(credentials)
                    if (parsedInput.success) {
                        const username = parsedInput.data.username;
                        const password = parsedInput.data.password;
                        const user = await User.findOne({ username });
                        if (user) {
                            if (password === user.password) {
                                return {
                                    id: user._id,
                                    name: user.username,
                                    email: user.email,
                                    image: user.image
                                };
                            } else {
                                return null
                            }
                        } else {
                            const newuser = new User({ username, password });
                            let userInDb = await newuser.save();
                            return {
                                id: userInDb._id,
                                name: userInDb.username,
                                email: userInDb.email,
                                image: userInDb.image
                            };
                        }
                    } else {
                        throw new Error(parsedInput.error.toString())
                    }
                }
            }
        })

    ] as Provider[],
    callbacks: {
        async session({ session }) {
            return session
        },
        async signIn({ profile }) {
            if (profile !== undefined) {//control reacher here when signinig in via an external provider
                const username = profile?.name?.split(" ")[0]
                console.log(username);
                console.log(profile)
                try {
                    await ensureDbConnected();
                    const userExists = await User.findOne({ username: profile.email });
                    if (userExists) {
                        console.log(userExists)
                    } else {
                        const newUser = new User({ username: profile.email });
                        await newUser.save()
                    }   
                    return true;
                } catch (error) {
                    console.log(error);
                    return false;
                }
            } else { //control reaches here when profile === undefined, ie, when user is signing in via credentials provider.
                // console.log("beep beep")
                return true;
            }
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    jwt: {
        maxAge: 30 * 24 * 60 * 60,
    }
}

export default NextAuth(authOptions)




