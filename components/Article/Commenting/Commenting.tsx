import React, { useState } from "react";

// Hooks
import useArticleQuery from "hooks/useArticleQuery";

// Libraries
import axios from "axios";
import _ from "lodash";
import { toast } from "react-toastify";

// MUI
import Rating from "@mui/material/Rating";

// Components
import CommentingSkeleton from "components/Course/Commenting/CommentingSkeleton/CommentingSkeleton";

// CSS
import style from "./Commenting.module.scss";
import { Skeleton } from "@mui/material";

// Types
type Props = {
	loggedInUserToken: string;
	articleId: number;
};

const Commenting = (props: Props) => {
	const { loggedInUserToken, articleId } = props;
	const article = useArticleQuery(articleId);

	// ——— Score Rating
	const [submittingScore, setSubmittingScore] = useState(false);
	const handleSubmitScore = async (event: React.SyntheticEvent, score: number | null) => {
		setSubmittingScore(true);
		try {
			const { data: submitArticleScoreApiResponse } = await axios.post(
				"/reviews/create",
				{
					collection_id: articleId,
					type: "posts",
					star: _.toString(score),
				},
				{
					headers: {
						authorization: `Bearer ${loggedInUserToken}`,
					},
				}
			);

			// ثبت امتیاز ستاره‌ای موفقیت آمیز بود
			if (submitArticleScoreApiResponse.isDone) {
				toast.success("امتیاز شما ثبت شد");
				article.refetch();
			} else {
				toast.error("خطا در ثبت امتیاز");
			}
		} catch (e) {
			toast.error("خطای ارتباط با سرور");
		}
		setSubmittingScore(false);
	};

	// ——— Comment
	const commentMaximumCharacters = 256;
	const [comment, setComment] = useState("");
	const handleCommentOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const enteredComment = event.target.value;
		const properComment = enteredComment
			.replace(/( )+/g, " ")
			.slice(0, commentMaximumCharacters);

		setComment(properComment);
	};

	// ——— Submit Comment
	const [submittingComment, setSubmittingComment] = useState(false);
	const submitCommentButtonDisabled = !comment || submittingComment;
	const handleSubmitComment = async () => {
		setSubmittingComment(true);
		try {
			const { data: submitCommentApiResponse } = await axios.post(
				"/posts/comments/create",
				{
					post_id: articleId,
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
				article.refetch();
			} else {
				toast.error("خطا در ارسال نظر");
			}
		} catch (e) {
			toast.error("خطا ارتباط با سرور");
		}
		setSubmittingComment(false);
	};

	if (article.data === undefined) {
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
				<form id="ArticleSubmitCommentForm" onSubmit={(e) => e.preventDefault()}>
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
							form="ArticleSubmitCommentForm"
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

export default Commenting;
