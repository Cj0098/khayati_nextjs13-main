import Link from "components/common/Link/Link";

// Libraries
import { v4 as uuid } from "uuid";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Video = ({ url, image, imageAlt, square = false }) => (
	<Link
		href={url}
		className={`relative block overflow-hidden duration-200 rounded-3xl hover:shadow-xl
		${square ? "aspect-square" : ""}`}
	>
		<LazyLoadImage
			src={image}
			alt={imageAlt}
			className="h-full max-w-none absolute top-1/2 left-1/2"
			style={{ transform: "translate(-50%, -50%)" }}
		/>
	</Link>
);

const VideoList = ({ videos = [] }) => {
	return (
		<div
			className="grid gap-2 sm:gap-8 md:gap-12"
			style={{
				gridTemplateColumns: "minmax(1px, 3fr) minmax(1px, 2fr) minmax(1px, 1fr)",
			}}
		>
			{videos.map(({ id, slug = "", img, name }, index) => (
				<Video
					key={uuid()}
					url={`/course/${id}/${slug}`}
					image={img}
					imageAlt={name}
					square={index === 0}
				/>
			))}
		</div>
	);
};

export default VideoList;
