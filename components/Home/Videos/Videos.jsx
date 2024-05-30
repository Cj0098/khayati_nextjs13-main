// Libraries
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Components
import Section from "../Section/Section";
import SectionHead from "../Section/SectionHead";
import VideoSkeletons from "./VideoSkeletons/VideoSkeletons";
import VideoList from "./VideoList/VideoList";

const Videos = (props) => {
	const fetchVideos = () => axios.post("/theme/courses/pricy/hits").then((res) => res.data.data);
	const bestVideosOfThisMonth = useQuery(["Home", "BestVideosOfThisMonth"], fetchVideos, {
		retry: true,
		staleTime: 30 * 1000,
	});

	return (
		<Section>
			<div className="container">
				<SectionHead text="برترین ویدیو های این ماه" />

				{/* If videos were in loading state */}
				{bestVideosOfThisMonth.isLoading && <VideoSkeletons />}

				{/* If videos were loaded */}
				{!bestVideosOfThisMonth.isLoading && (
					<>
						{bestVideosOfThisMonth.data.length === 0 && (
							<div className="text-center">
								<span>فعلا ویدیویی نیست!</span>
							</div>
						)}

						{bestVideosOfThisMonth.data.length > 0 && (
							<VideoList videos={bestVideosOfThisMonth.data.slice(0, 3)} />
						)}
					</>
				)}
			</div>
		</Section>
	);
};

export default Videos;
