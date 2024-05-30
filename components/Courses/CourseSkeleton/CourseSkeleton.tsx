import React from "react";

// Components
import Skeleton from "components/common/Skeleton/Skeleton";
import Space from "components/common/Space/Space";

const CourseSkeleton = () => {
	return (
		<div>
			{/* <Course Image Skeleton> */}
			<div>
				<Skeleton width="100%" aspectRatio="1 / 1" />
			</div>

			<Space height="0.5rem" />

			{/* <Course Title Skeleton> */}
			<div className="flex-center">
				<Skeleton width="80%" height="1rem" />
			</div>

			<Space height="1.5rem" />

			{/* <Course Rating Skeleton> */}
			<div className="flex-center">
				<Skeleton width="50%" height="0.5rem" />
			</div>

			<Space height="0.5rem" />

			{/* <Course More Button Skeleton> */}
			<div className="flex-center">
				<Skeleton width="50%" height="2rem" borderRadius="9999rem" />
			</div>
		</div>
	);
};

export default CourseSkeleton;
