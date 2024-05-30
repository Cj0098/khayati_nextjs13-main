// Components
import Skeleton from "../../../common/Skeleton/Skeleton";

const VideoSkeleton = ({ aspectRatio = "auto" }) => <Skeleton aspectRatio={aspectRatio}></Skeleton>;

const VideoSkeletons = (props) => {
	return (
		<div
			className="grid gap-2 sm:gap-8 md:gap-12"
			style={{ gridTemplateColumns: "minmax(1px, 3fr) minmax(1px, 2fr) minmax(1px, 1fr)" }}
		>
			<VideoSkeleton aspectRatio={"1 / 1"} />
			<VideoSkeleton />
			<VideoSkeleton />
		</div>
	);
};

export default VideoSkeletons;
