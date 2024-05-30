// Hooks
import useUserQuery from "hooks/useUserQuery";
import useArticleQuery from "hooks/useArticleQuery";

// Libraries
import axios from "axios";
import { toast } from "react-toastify";

// Context
import { useContext } from "react";
import TokenContext from "context/token/TokenContext";

// Components
import CommentSkeleton from "components/Course/Comments/CommentSkeleton/CommentSkeleton";
import Comment from "components/Course/Comments/Comment/Comment";

// Types
type Props = {
	articleId: number;
};

const Comments = (props: Props) => {
	const { articleId } = props;
	const article = useArticleQuery(articleId);
	const user = useUserQuery();
	const { token: loggedInUserToken } = useContext(TokenContext);

	const handleDeleteComment = async (commentId: number) => {
		try {
			const { data: deleteArticleCommentApiResponse } = await axios.get(
				`/comments/delete/post/${commentId}`,
				{
					headers: {
						authorization: `Bearer ${loggedInUserToken}`,
					},
				}
			);

			if (deleteArticleCommentApiResponse.isDone) {
				article.refetch();
			} else {
				toast.error("خطا در حذف نظر");
			}
		} catch (e) {
			toast.error("خطا ارتباط با سرور");
		}
	};

	// If comments were in 'loading' state
	if (article.data === undefined) {
		return (
			<div className="flex flex-col gap-2 mt-8 sm:mt-12">
				<CommentSkeleton />
				<CommentSkeleton />
				<CommentSkeleton />
			</div>
		);
	}

	// if there was no comments available for article
	if (article.data.comments.length === 0) return null;

	return (
		<section className="mt-8 sm:mt-12">
			<div className="mb-2">
				<h2>نظرات کاربران :</h2>
			</div>
			<ul className="flex flex-col gap-2">
				{article.data.comments.map((comment) => (
					<Comment
						key={`/article/${articleId}|Comment-${comment.id}`}
						userIsAdmin={user.data?.role === "admin"}
						userAvatar={comment.user?.avatar || "/images/user.png"}
						userName={comment.user.name}
						userComment={comment.text}
						handleDeleteComment={() => handleDeleteComment(comment.id)}
					/>
				))}
			</ul>
		</section>
	);
};

export default Comments;
