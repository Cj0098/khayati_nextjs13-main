import React from "react";

// Hooks
import useCourseQuery from "hooks/useCourseQuery";

// Components
import Skeleton from "components/common/Skeleton/Skeleton";
import Rate from "components/common/Rate/Rate";

// Types
type Props = {
	courseId: number;
};

const Rating = (props: Props) => {
	const { courseId } = props;
	const course = useCourseQuery(courseId);

	if (course.data === undefined) {
		return (
			<div>
				<Skeleton width="8rem" height="1.5rem" />
			</div>
		);
	}

	return (
		<div className="flex items-center gap-2">
			<div className="flex" dir="ltr">
				<Rate score={course.data.reviewsRating} />
			</div>
			<div className="">
				<span className="font-bold">{course.data.reviewsRating}</span>{" "}
				<span className="text-gray-400">از {course.data.reviews} رأی</span>
			</div>
		</div>
	);
};

export default Rating;
