// Components
import Skeleton from "../../../common/Skeleton/Skeleton";

const BookmarkedSkeleton = (props) => {
	return (
		<li className="flex justify-between">
			<div className="flex items-center gap-2">
				<div>
					<Skeleton width="30px" height="30px" borderRadius="4px" />
				</div>

				<div>
					<Skeleton width="80px" height="10px" borderRadius="4px" />
				</div>
			</div>

			<div>
				<Skeleton width="60px" height="30px" borderRadius="4px" />
			</div>
		</li>
	);
};

export default BookmarkedSkeleton;
