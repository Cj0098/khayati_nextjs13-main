/* 
	@description : Article Bookmark/UnBookmark Component
	@props : {
		loggedInUserToken: <Boolean|String> | required
		postId : <Number> | required
		isBookmarked : <Boolean> | required
	}
*/

import React, { useRef, useState } from "react";
import { useUpdateEffect } from "react-use";

// Libraries
import axios from "axios";
import { toast } from "react-toastify";

// Components
import Skeleton from "components/common/Skeleton/Skeleton";

// Icons
import { BsBookmark } from "react-icons/bs";
import { BsFillBookmarkFill } from "react-icons/bs";

// Types
type Props = {
	loggedInUserToken: string;
	articleId: number;
	isBookmarked: boolean | undefined;
};

const Bookmark = (props: Props) => {
	const { loggedInUserToken, articleId, isBookmarked } = props;

	const [bookmarked, setBookmarked] = useState<boolean>(false);
	const setInitialBookmarkStatus = useRef<boolean>(false);
	useUpdateEffect(() => {
		if (isBookmarked !== undefined) {
			if (setInitialBookmarkStatus.current === false) {
				setBookmarked(isBookmarked);
				setInitialBookmarkStatus.current = true;
			}
		}
	}, [isBookmarked]);

	const [hover, setHover] = useState(false);

	// Submit Bookmark
	const [submitting, setSubmitting] = useState(false);
	const handleSubmitToggleBookmark = async () => {
		setSubmitting(true);
		try {
			const { data: toggleBookmarkApiResponse } = await axios.post(
				"/auth/bookmarks/create",
				{
					collection_id: articleId,
					type: "post",
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

	// If article was not loaded yet!
	if (isBookmarked === undefined) {
		return (
			<div>
				<Skeleton className="w-40 h-6" />
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
