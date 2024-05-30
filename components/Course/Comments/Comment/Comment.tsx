// Libraries
import { LazyLoadImage } from "react-lazy-load-image-component";

// Icons
import { BsTrashFill } from "react-icons/bs";

// Types
type Props = {
	userIsAdmin?: boolean;
	userAvatar: string;
	userName: string;
	userComment: string;
	handleDeleteComment?: React.MouseEventHandler<HTMLButtonElement>;
};

const Comment = (props: Props) => {
	const {
		userIsAdmin = false,
		userAvatar,
		userName,
		userComment,
		handleDeleteComment = () => {},
	} = props;

	return (
		<li className="relative p-2 bg-white rounded-xl">
			{/* ——— <Delete Comment Button> (if user role was admin) ——— */}
			{userIsAdmin && (
				<button
					onClick={handleDeleteComment}
					className="absolute text-xl text-red-500 opacity-50 top-2 left-2 hover:opacity-100"
				>
					<BsTrashFill />
				</button>
			)}

			{/* ——— <User> ——— */}
			<div className="flex items-center gap-2 mb-2">
				<div>
					<LazyLoadImage
						src={`${userAvatar ? userAvatar : "/images/user.png"}`}
						alt="آواتار"
						className="w-8 rounded-full"
					/>
				</div>

				<div>
					<span className="text-gray-700">{userName} :</span>
				</div>
			</div>

			{/* ——— <Comment> ——— */}
			<div>
				<p>{userComment}</p>
			</div>
		</li>
	);
};

export default Comment;
