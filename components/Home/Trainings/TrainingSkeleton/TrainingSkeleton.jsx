// Components
import Skeleton from "../../../common/Skeleton/Skeleton";

const TrainingSkeleton = (props) => {
	return (
		<li className="w-full mb-6">
			<div
				className="grid h-full gap-4"
				style={{
					gridTemplateColumns: "minmax(60px, 100px) minmax(120px, 200px)",
				}}
			>
				<div>
					<Skeleton width="100px" height="100px" aspectRatio="1 / 1" />
				</div>
				<div className="flex flex-col justify-between">
					<Skeleton width="50%" aspectRatio="10 / 2" />
					<Skeleton width="100%" aspectRatio="10 / 1" />
					<Skeleton width="50%" aspectRatio="10 / 2" />
					<Skeleton width="100%" aspectRatio="10 / 1" />
				</div>
			</div>
		</li>
	);
};

export default TrainingSkeleton;
