import axios from "axios";
import { useSession } from "next-auth/react";
import CourseCard from "ui/courseCard";

export interface Course {
    _id?: string,
    title: string,
    description: string,
    price: number,
    imageLink: string,
    published?: boolean
}

export default function Courses({ data }: { data: any }) {
    const session = useSession();
    if (session.status === "authenticated") {
        const courses = data.message
        return <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {
                courses.map((course: Course) => {
                    return <CourseCard course={course}></CourseCard>
                })
            }
        </div>
    } else {
        return <div>
            no no no
        </div>
    }

}

export async function getServerSideProps() {
    const res = await axios.get("http://localhost:3000/api/user/courses");
    const data = await res.data;
    return {
        props: { data },
    };
}