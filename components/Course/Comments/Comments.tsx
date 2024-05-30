import React from "react";

// Hooks
import useUserQuery from "hooks/useUserQuery";
import useCourseQuery from "hooks/useCourseQuery";

// Libraries
import axios from "axios";
import { toast } from "react-toastify";

// Components
import CommentSkeleton from "./CommentSkeleton/CommentSkeleton";
import Comment from "./Comment/Comment";

// Types
type Props = {
	courseId: number;
	loggedInUserToken: string | false;
};

const Comments = (props: Props) => {
	const { courseId, loggedInUserToken } = props;

	const user = useUserQuery();
	const course = useCourseQuery(courseId);

	const handleDeleteComment = async (commentId: number) => {
		try {
			const { data: deleteCourseCommentApiResponse } = await axios.get(
				`/comments/delete/course/${commentId}`,
				{
					headers: {
						authorization: `Bearer ${loggedInUserToken}`,
					},
				}
			);

			if (deleteCourseCommentApiResponse.isDone) {
				course.refetch();
			} else {
				toast.error("خطا در حذف نظر");
			}
		} catch (e) {
			toast.error("خطا ارتباط با سرور");
		}
	};

	// if comments were in 'loading' status
	if (course.data === undefined) {
		return (
			<div className="flex flex-col gap-4 mt-12">
				<CommentSkeleton />
				<CommentSkeleton />
				<CommentSkeleton />
			</div>
		);
	}

	// if there was no comment for course
	if (course.data.comments.length === 0) return null;

	return (
		<section className="mt-12">
			<div className="mb-2">
				<h2 className="text-lg font-medium">نظرات :</h2>
			</div>
			<ul className="flex flex-col gap-4">
				{course.data.comments.map((comment) => (
					<Comment
						key={`/course|comment-${comment.id}`}
						userIsAdmin={user.data?.role === "admin"}
						userAvatar={comment.user?.avatar || "/images/user.png"}
						userName={comment.user?.name}
						userComment={comment.text}
						handleDeleteComment={() => handleDeleteComment(comment.id)}
					/>
				))}
			</ul>
		</section>
	);
};

export default React.memo(Comments);
