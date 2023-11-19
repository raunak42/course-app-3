import { Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Signin from "ui/signin";

export default function SignIn() {
    const router = useRouter();
    const session = useSession();
    useEffect(() => {
        if (session.status !== "unauthenticated") {
            router.push("/");
        }
    }, [session]);
    return <div style={{ display: "flex", justifyContent: "center" }}>
        {
            session.status === "unauthenticated" &&
            <div style={{ display: "flex", flexFlow: "column", justifyContent: "center" }}>
                <Typography style={{ textAlign: "center", marginTop: 70 }} variant="h4">
                    Sign up for free
                </Typography>
                <div style={{ marginTop: 50 }}>
                    <Signin text={"Sign up"} googleImage="/continue-google.png"></Signin>
                </div>
            </div>
        }

    </div>
}