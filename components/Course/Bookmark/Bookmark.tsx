import React, { useState } from "react";

// Libraries
import axios from "axios";

// Hooks
import useCourseQuery from "hooks/useCourseQuery";

// Components
import Skeleton from "components/common/Skeleton/Skeleton";

// Icons
import { BsBookmark } from "react-icons/bs";
import { BsFillBookmarkFill } from "react-icons/bs";
import { toast } from "react-toastify";

// Types
type Props = {
	courseId: number;
	loggedInUserToken: string;
};

const Bookmark = (props: Props) => {
	const { courseId, loggedInUserToken } = props;
	const course = useCourseQuery(courseId);

	const [bookmarked, setBookmarked] = useState<boolean>(false);
	const [hover, setHover] = useState<boolean>(false);

	const [submitting, setSubmitting] = useState(false);
	const handleSubmitToggleBookmark = async () => {
		setSubmitting(true);
		try {
			const { data: toggleBookmarkApiResponse } = await axios.post(
				"/auth/bookmarks/create",
				{
					collection_id: courseId,
					type: "course",
				},
				{
					headers: {
						authorization: `Bearer ${loggedInUserToken}`,
					},
				}
			);

			if (toggleBookmarkApiResponse.isDone) {
				if (toggleBookmarkApiResponse.message === "created") {
					setBookmarked(true);
				} else {
					setBookmarked(false);
				}
			} else {
				toast.error("خطا در افزودن علاقه مندی");
			}
		} catch (e) {
			toast.error("خطا ارتباط با سرور");
		}
		setSubmitting(false);
	};

	if (course.data === undefined) {
		return (
			<div>
				<Skeleton width="7rem" height="1.5rem" />
			</div>
		);
	}

	return (
		<div
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			className="w-max"
		>
			{/* <Bookmark> */}
			{!bookmarked && (
				<button
					disabled={submitting}
					onClick={handleSubmitToggleBookmark}
					className="flex items-center gap-2 disabled:opacity-50"
				>
					<div>
						{submitting && (
							<i className="text-xl text-red-500/50">
								<BsFillBookmarkFill />
							</i>
						)}

						{!submitting && hover && (
							<i className="text-xl text-red-500/50">
								<BsFillBookmarkFill />
							</i>
						)}

						{!submitting && !hover && (
							<i className="text-xl text-red-500/50">
								<BsBookmark />
							</i>
						)}
					</div>
					<div>
						<span className={`${hover ? "underline" : ""}`}>افزودن به علاقه‌مندی</span>
					</div>
				</button>
			)}

			{/* <UnBookmark> */}
			{bookmarked && (
				<button
					disabled={submitting}
					onClick={handleSubmitToggleBookmark}
					className={`flex items-center gap-2 disabled:opacity-50`}
				>
					<div>
						<i className="text-xl text-red-500">
							<BsFillBookmarkFill />
						</i>
					</div>
					<div>
						<span className={`${hover ? "underline" : ""}`}>حذف از علاقه‌مندی</span>
					</div>
				</button>
			)}
		</div>
	);
};

export default React.memo(Bookmark);
