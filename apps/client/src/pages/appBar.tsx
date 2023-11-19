import { Avatar, Button } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import { transform } from "next/dist/build/swc";
import { useRouter } from "next/router";

export default function AppBar() {
  const session = useSession()
  const router = useRouter();
  return <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10, marginRight: 20 }}>
    {
      session.status !== "unauthenticated" &&
      <Button onClick={() => { signOut() }}>Logout</Button>
    }
    {
      session.status === "unauthenticated" && window.location.pathname !== "/signin" && window.location.pathname !== "/signup" &&
      <Button style={{ borderRadius: 50 }} variant="contained" onClick={() => { router.push("/signin") }}>Signin</Button>
    }
  </div>
}
