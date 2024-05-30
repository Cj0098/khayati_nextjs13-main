// Components
import Skeleton from "components/common/Skeleton/Skeleton";

const JournalSkeleton = () => {
	return (
		<li className="border-4 p-2 rounded-xl">
			<div className="mb-2">
				<Skeleton width="100%" aspectRatio="1 / 1" />
			</div>
			<div>
				<Skeleton width="70%" height="16px" style={{ margin: "0 auto" }} />
			</div>
		</li>
	);
};
export default JournalSkeleton;
