import React, { useState } from "react";
import Link from "components/common/Link/Link";

// Libraries
import axios from "axios";
import { toast } from "react-toastify";
import _ from "lodash";

// Hooks
import useCourseQuery from "hooks/useCourseQuery";

// Components
import CommentingSkeleton from "./CommentingSkeleton/CommentingSkeleton";

// MUI
import Rating from "@mui/material/Rating";

// CSS
import style from "./Commenting.module.scss";

// Types
type Props = {
	courseId: number;
	loggedInUserToken: string;
};

const Commenting = (props: Props) => {
	const { courseId, loggedInUserToken } = props;
	const course = useCourseQuery(courseId);

	// ————— S C O R E —————
	const [submittingScore, setSubmittingScore] = useState(false);
	const handleSubmitScore = async (event: React.SyntheticEvent, score: number | null) => {
		setSubmittingScore(true);
		try {
			const { data: submitCourseScoreApiResponse } = await axios.post(
				"/reviews/create",
				{
					collection_id: courseId,
					type: "courses",
					star: _.toString(score),
				},
				{
					headers: {
						authorization: `Bearer ${loggedInUserToken}`,
					},
				}
			);

			// ثبت امتیاز ستاره‌ای موفقیت آمیز بود
			if (submitCourseScoreApiResponse.isDone) {
				toast.success("امتیاز شما ثبت شد");
				course.refetch();
			} else {
				toast.error("خطا در ثبت امتیاز");
			}
		} catch (e) {
			toast.error("خطای ارتباط با سرور");
		}
		setSubmittingScore(false);
	};

	// ————— C O M M E N T —————
	const commentMaximumCharacters = 256;
	const [comment, setComment] = useState("");
	const handleCommentOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const enteredComment = event.target.value;
		const properComment = enteredComment
			.replace(/( )+/g, " ")
			.slice(0, commentMaximumCharacters);
		if (properComment.length === 1) {
			if (properComment === " ") {
				setComment("");
			} else {
				setComment(properComment);
			}
			return;
		}
		setComment(properComment);
	};

	const [submittingComment, setSubmittingComment] = useState(false);
	const submitCommentButtonDisabled = !comment || submittingComment;
	const handleSubmitComment = async () => {
		setSubmittingComment(true);
		try {
			const { data: submitCommentApiResponse } = await axios.post(
				"/courses/comments/create",
				{
					course_id: courseId,
					parent_id: null,
					text: comment,
				},
				{
					headers: {
						authorization: `Bearer ${loggedInUserToken}`,
					},
				}
			);

			if (submitCommentApiResponse.isDone) {
				toast.success("نظر شما ثبت شد");
				setComment("");
				course.refetch();
			} else {
				toast.error("خطایی رخ داد");
			}
		} catch (e) {
			toast.error("خطا ارتباط با سرور");
		}
		setSubmittingComment(false);
	};

	if (course.data === undefined) {
		return <CommentingSkeleton />;
	}

	return (
		<div>
			{/* ——— <Rating> ——— */}
			<div
				dir="ltr"
				className={`flex justify-center mb-3
				${submittingScore ? "opacity-90" : "opacity-100"}`}
			>
				<Rating size="large" disabled={submittingScore} onChange={handleSubmitScore} />
			</div>

			{/* ——— <Commenting> ——— */}
			<div>
				<form id="CourseSubmitCommentForm" onSubmit={(e) => e.preventDefault()}>
					{/* ——— <Textarea> ——— */}
					<div className="mb-2">
						<div className="mb-1">
							<textarea
								placeholder="نظر خود را بنویسید ..."
								rows={10}
								value={comment}
								onChange={handleCommentOnChange}
								className={`block w-full p-4 duration-200 bg-white rounded-3xl outline-none resize-none
                            	${style.CommentTextarea}`}
							></textarea>
						</div>
						<div>
							<span className="text-sm text-gray-600">
								{commentMaximumCharacters - comment.length} کاراکتر
							</span>
						</div>
					</div>

					{/* ——— <Submit Comment Button> ——— */}
					<div className="text-center">
						<button
							form="CourseSubmitCommentForm"
							disabled={submitCommentButtonDisabled}
							onClick={handleSubmitComment}
							className={`text-white duration-200 bg-green-400 py-2 px-3 rounded-xl
                            ${submitCommentButtonDisabled ? "opacity-60" : "hover:bg-green-500"}`}
						>
							ارسال نظر
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default React.memo(Commenting);
