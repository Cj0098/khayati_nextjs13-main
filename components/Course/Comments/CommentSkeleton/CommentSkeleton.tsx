// Components
import Skeleton from "components/common/Skeleton/Skeleton";

const CommentSkeleton = () => (
	<div
		className="grid items-center gap-2 p-2 rounded bg-white/30"
		style={{ gridTemplateColumns: "max-content minmax(1px, 1fr)" }}
	>
		<div>
			<Skeleton width="50px" height="50px" borderRadius="100%" />
		</div>
		<div className="flex flex-col gap-2">
			<Skeleton width="50px" height="10px" borderRadius="4px" />
			<Skeleton width="100%" height="10px" borderRadius="4px" style={{ maxWidth: "200px" }} />
		</div>
	</div>
);

export default CommentSkeleton;
