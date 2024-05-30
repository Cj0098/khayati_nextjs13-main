import { useState } from "react";
import Link from "components/common/Link/Link";
import Head from "next/head";
// Context
import { useContext } from "react";
import TokenContext from "context/token/TokenContext";

// Components
import MainContainer from "components/common/MainContainer/MainContainer";
import Detail from "./Detail/Detail";
import Video from "./Video/Video";
import Bookmark from "./Bookmark/Bookmark";
import Rating from "./Rating/Rating";
import Comments from "./Comments/Comments";
import Commenting from "./Commenting/Commenting";
import Description from "./Description/Description";
import Space from "components/common/Space/Space";
import useCourseQuery from "hooks/useCourseQuery";
// Types
type Props = {
	courseId: number;
};

const Course = (props: Props) => {
	const { courseId } = props;
	const { token: loggedInUserToken } = useContext(TokenContext);
	const course = useCourseQuery(courseId);
	const [activeVideoId, setActiveVideoId] = useState<number | false>(false);
	const appTitle = process.env.NEXT_PUBLIC_APP_TITLE;
	return (
		<>
			<Head>
				<title>{`${
					course.data === undefined ? "مقاله" : course.data.name
				} — ${appTitle}`}</title>
			</Head>
			<MainContainer>
				{/* ——— <Detail> ——— */}
				<Detail courseId={courseId} />

				{/* ——— <Video> ——— */}
				<Video
					courseId={courseId}
					activeVideoId={activeVideoId}
					setActiveVideoId={setActiveVideoId}
				/>

				{/* ——— <Description> ——— */}
				<Description courseId={courseId} activeVideoId={activeVideoId} />

				<Space height="1rem" />

				{/* ——— <Boomark & Rate> ——— */}
				<div className="flex flex-wrap justify-between gap-4">
					{/* ——— <Bookmark> (Only LoggedInUser) ——— */}
					{loggedInUserToken ? (
						<Bookmark courseId={courseId} loggedInUserToken={loggedInUserToken} />
					) : (
						<div></div>
					)}

					{/* ——— <Rating> ——— */}
					<Rating courseId={courseId} />
				</div>
				{/* ——— </Boomark & Rate> ——— */}

				{/* ——— <Comments> ——— */}
				<Comments courseId={courseId} loggedInUserToken={loggedInUserToken} />

				<Space height="3rem" />

				{/* ——— <Commenting> ——— */}
				{loggedInUserToken === false ? (
					<div className="mt-8 sm:mt-16">
						<Link
							href="/authentication"
							className="block hover:underline text-center opacity-50 hover:opacity-100"
						>
							برای ارسال نظر وارد شوید
						</Link>
					</div>
				) : (
					<Commenting courseId={courseId} loggedInUserToken={loggedInUserToken} />
				)}
			</MainContainer>
		</>
	);
};

export default Course;
