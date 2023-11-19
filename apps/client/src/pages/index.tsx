import { Button, Typography } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  return <div style={{ textAlign:"center", marginTop:250 }}>
    <Typography variant="h1">HomePage</Typography>
  </div>
}
