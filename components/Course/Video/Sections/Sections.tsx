import React from "react";

// Components
import Skeleton from "components/common/Skeleton/Skeleton";
import Section from "./Section/Section";

// Types
import type { CourseT } from "hooks/useCourseQuery";
type Props = {
	courseId: number;
	course: CourseT | undefined;
	activeVideoId: number | false;
	setActiveVideoId: React.Dispatch<React.SetStateAction<number | false>>;
};

const Sections = (props: Props) => {
	const { courseId, course, activeVideoId, setActiveVideoId } = props;

	if (course === undefined) {
		return (
			<div className="flex flex-col gap-2 p-2">
				<Skeleton width="100%" height="2rem" />
				<Skeleton width="100%" height="2rem" />
				<Skeleton width="100%" height="2rem" />
				<Skeleton width="100%" height="2rem" />
				<Skeleton width="100%" height="2rem" />
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-2 overflow-auto">
			{course.sections.map((section) => (
				<Section
					key={`/course/${courseId}|Video-Sections-Section-${section.id}`}
					courseId={courseId}
					sectionId={section.id}
					name={section.name}
					videos={section.videos}
					activeVideoId={activeVideoId}
					setActiveVideoId={setActiveVideoId}
				/>
			))}
		</div>
	);
};

export default Sections;
