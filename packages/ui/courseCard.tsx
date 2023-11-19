import { Typography } from "@mui/material"
import Card from "@mui/material/Card"


interface CourseCardProps {
    course: {
        _id?: string,
        title: string,
        description: string,
        price: number,
        imageLink: string,
        published?: boolean
    }
}
export default function CourseCard(props: CourseCardProps) {
    return <div style={{ padding: 20 }}>
        <Card style={{ height: 350, width: 300, padding: 10 }}>
            <Typography>{props.course.title}</Typography>
            <Typography>{props.course.description}</Typography>
            <img src={props.course.imageLink}></img>
            <Typography>{props.course.price}</Typography>
        </Card>
    </div>
}