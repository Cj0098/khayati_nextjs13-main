import React, { useState } from "react";

// Components
import Lesson from "../Lesson/Lesson";

// Icons
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

// Types
import type { CourseVideo } from "hooks/useCourseQuery";
type Props = {
	courseId: number;
	sectionId: number;
	name: string;
	videos: CourseVideo[];
	activeVideoId: number | false;
	setActiveVideoId: React.Dispatch<React.SetStateAction<number | false>>;
};

const Section = (props: Props) => {
	const { courseId, sectionId, name, videos, activeVideoId, setActiveVideoId } = props;

	const [open, setOpen] = useState(false);
	const toggleOpen = () => setOpen((c) => !c);

	return (
		<div>
			{/* <Section Title> */}
			<div
				className="text-white bg-green-600 hover:bg-green-700 flex gap-1
				items-center px-1 py-2 cursor-pointer"
				onClick={toggleOpen}
			>
				{/* <Dropdown arrow> */}
				<div>
					<i className="text-2xl font-bold">
						{open ? <IoIosArrowUp /> : <IoIosArrowDown />}
					</i>
				</div>

				<div>
					<span>{name}</span>
				</div>

				<div>
					<span>({videos.length} ویدیو)</span>
				</div>
			</div>

			{/* <Section Videos> */}
			{open && (
				<div className="bg-green-600/20">
					{videos.map((video) => (
						<Lesson
							key={`/course/${courseId}|Video-Section-Section-${sectionId}-Video-${video.id}`}
							title={video.name}
							active={activeVideoId === video.id}
							onClick={() => setActiveVideoId(video.id)}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default Section;
