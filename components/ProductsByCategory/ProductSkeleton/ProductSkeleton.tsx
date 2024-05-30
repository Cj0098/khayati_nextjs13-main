import React from "react";

// Components
import Skeleton from "components/common/Skeleton/Skeleton";
import Space from "components/common/Space/Space";

const ProductSkeleton = () => {
	return (
		<div className="bg-white p-2">
			<div>
				<Skeleton width="100%" aspectRatio="1 / 1" />
			</div>
			<Space height="3rem" />
			<div className="flex-center">
				<Skeleton width="80%" height="1rem" />
			</div>
			<Space height="1rem" />
			<div className="flex-center">
				<Skeleton width="60%" height="1rem" />
			</div>
		</div>
	);
};

export default ProductSkeleton;
