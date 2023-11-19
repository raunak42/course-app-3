import { Button, Card, Divider, TextField, Typography } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface signProps {
    text?: string,
    onClick?: () => {

    },
    googleImage?: string
}

export default function Signin(props: signProps) {
    const session = useSession();
    const router = useRouter();
    return <div style={{}}>
        {
            
        }
        <Card style={{
            height: 350, width: 300, borderRadius: 5,
            display: "flex", flexFlow: "column", justifyContent: "space-evenly",
            backgroundColor: "#f5f5f5"
        }}>
            <div style={{ textAlign: "center" }}>
                <TextField autoFocus={true} style={{ width: "90%" }} label="username" type="text"></TextField>
                <TextField style={{ width: "90%", marginTop:15 }} label="password" type="password"></TextField>
                <Button variant="outlined" style={{marginTop:15}}>
                    <Typography variant="body2">{props.text}</Typography>
                </Button>
            </div>
            <Divider variant="middle"></Divider>
            <div style={{ textAlign: "center" }}>
                <img
                    src={props.googleImage}
                    onClick={() => { signIn("google") }}
                    style={{
                        // marginLeft: 50,
                        cursor: "pointer",
                        width: 200,
                        transition: "transform 0.2s",
                        border: "1px solid black",
                        borderRadius: 25
                    }}
                    onTouchStart={() => { }}
                    onMouseEnter={(e) => {
                        // Apply the shading effect on mouse enter
                        e.currentTarget.style.filter = 'brightness(90%)';
                    }}
                    onMouseDown={(e) => {
                        // Apply the visual effect on mouse click
                        e.currentTarget.style.transform = 'scale(0.95)';
                    }}
                    onMouseUp={(e) => {
                        // Remove the visual effect on mouse release
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.filter = 'brightness(100%)';

                    }}
                    onMouseLeave={(e) => {
                        // Remove the visual effect if the mouse leaves the image
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.filter = 'brightness(100%)';

                    }}
                ></img>
            </div>
        </Card>
    </div>
}