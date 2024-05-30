import React from "react";

// Hooks
import useCourseQuery from "hooks/useCourseQuery";

// Components
import Sections from "./Sections/Sections";

// CSS
import style from "./Video.module.scss";
import Player from "./Player/Player";

// Types
type Props = {
	courseId: number;
	activeVideoId: number | false;
	setActiveVideoId: React.Dispatch<React.SetStateAction<number | false>>;
};

const Video = (props: Props) => {
	const { courseId, activeVideoId, setActiveVideoId } = props;
	const course = useCourseQuery(courseId);

	console.log(course.data);

	return (
		<div className="bg-[#D9D9D9]">
			<div className={`grid ${style.VideoContainer}`}>
				{/* <Player> */}
				<Player course={course.data} activeVideoId={activeVideoId} />

				{/* <Sections> */}
				<Sections
					courseId={courseId}
					course={course.data}
					activeVideoId={activeVideoId}
					setActiveVideoId={setActiveVideoId}
				/>
			</div>
		</div>
	);
};

export default Video;
