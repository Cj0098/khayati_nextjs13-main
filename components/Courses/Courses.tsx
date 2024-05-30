import React from "react";

// Libraries
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import _ from "lodash";

// Components
import CourseSkeleton from "./CourseSkeleton/CourseSkeleton";
import Course from "./Course/Course";

// Types
type CourseT = {
	id: number;
	img: string;
	name: string;
	reviewsRating: number;
	reviews: number;
	slug: string;
};

type Props = {
	coursesType: "pricy" | "free";
};

const Courses = (props: Props) => {
	const { coursesType } = props;

	const fetchPricyCourses = () =>
		axios.get(`/courses/${coursesType}`).then((res) => res.data.data);
	const courses = useQuery<CourseT[]>(["Courses", _.upperFirst(coursesType)], fetchPricyCourses, {
		retry: true,
	});

	return (
		<main className="py-12 sm:py-20">
			<div className="container">
				<div
					className="grid gap-8"
					style={{ gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}
				>
					{courses.data === undefined ? (
						<>
							<CourseSkeleton />
							<CourseSkeleton />
							<CourseSkeleton />
							<CourseSkeleton />
							<CourseSkeleton />
						</>
					) : (
						<>
							{courses.data.map((course) => (
								<Course
									key={`/courses/pricy|course-${course.id}`}
									url={`/course/${course.id}/${course.slug}`}
									image={course.img}
									title={course.name}
									rateScore={course.reviewsRating}
									rateCount={course.reviews}
								/>
							))}
						</>
					)}
				</div>
			</div>
		</main>
	);
};

export default Courses;
