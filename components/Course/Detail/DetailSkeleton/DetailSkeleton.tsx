import React from "react";

// Components
import Skeleton from "components/common/Skeleton/Skeleton";

const DetailSkeleton = () => {
	return (
		<div className="bg-[#C7C7C7] py-6 px-2 sm:px-4 rounded-tl-xl rounded-tr-xl">
			<div className="flex flex-wrap items-center gap-4 justify-between">
				{/* <Course Title Skeleton> */}
				<div>
					<Skeleton width="10rem" height="2rem" />
				</div>

				{/* <Course Detail Skeleton> */}
				<div className="flex gap-4 flex-wrap">
					<div>
						<Skeleton width="8rem" aspectRatio="1 / 1" />
					</div>
					<div>
						<Skeleton width="8rem" aspectRatio="1 / 1" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailSkeleton;
