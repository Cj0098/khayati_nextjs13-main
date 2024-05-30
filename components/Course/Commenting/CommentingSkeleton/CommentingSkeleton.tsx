import React from "react";

// Components
import Skeleton from "components/common/Skeleton/Skeleton";
import Space from "components/common/Space/Space";

const CommentingSkeleton = () => {
	return (
		<div>
			{/* ——— <Star Rating Skeleton> ——— */}
			<div className="flex-center">
				<Skeleton className="w-32 h-5" />
			</div>

			<Space height="0.5rem" />

			{/* ——— <TextArea Skeleton> ——— */}
			<div>
				<Skeleton width="100%" aspectRatio="5 / 1" />
			</div>

			<Space height="1rem" />

			<div className="flex-center">
				<Skeleton className="w-32 h-8" />
			</div>
		</div>
	);
};

export default CommentingSkeleton;
