import React, { useState } from "react";
import { useUpdateEffect } from "react-use";
import ReactPlayer from "react-player";
// Libraries
import { DotLoader } from "react-spinners";

// Components
import Skeleton from "components/common/Skeleton/Skeleton";

// Types
import type { CourseT } from "hooks/useCourseQuery";
type Props = {
	course: CourseT | undefined;
	activeVideoId: number | false;
};

const Player = (props: Props) => {
	const { course, activeVideoId } = props;

	const [videoIsLoading, setVideoIsLoading] = useState(false);
	const [isPlaying, setIsPlaying] = useState(true);

	useUpdateEffect(() => {
		setVideoIsLoading(true);
		const videoLoadTimeout = setTimeout(() => {
			setVideoIsLoading(false);
		}, 1500);

		return () => clearTimeout(videoLoadTimeout);
	}, [activeVideoId]);

	// When Course data was not loaded yet!
	if (course === undefined) {
		return (
			<div className="p-2">
				<div className="w-full h-full lg:hidden">
					<Skeleton width="100%" aspectRatio="2 / 1" />
				</div>
				<div className="w-full h-full hidden lg:block">
					<Skeleton width="100%" height="100%" />
				</div>
			</div>
		);
	}

	// If no video was selected by user to show : Show Course Poster/Image
	if (activeVideoId === false) {
		return (
			<div className="flex justify-center">
				<img src={course.img} alt="پوستر" />
			</div>
		);
	}

	if (videoIsLoading) {
		return (
			<div className="flex-center">
				<DotLoader size={50} color="#2D9D08" />
			</div>
		);
	}

	// Find Active Content Url
	let activeContent = course.videos.find((video) => video.id === activeVideoId);
	if (activeContent === undefined) {
		return (
			<div>
				<span>محتوای انتخابی یافت نشد</span>
			</div>
		);
	}

	let activeContentUrl;
	if (course.type === "pricy") {
		activeContentUrl = activeContent.demo;
	} else {
		activeContentUrl = activeContent.url;
	}

	// If Active Content Was an Image
	if (
		activeContentUrl.endsWith("png") ||
		activeContentUrl.endsWith("jpg") ||
		activeContentUrl.endsWith("jpeg")
	) {
		return (
			<div className="flex justify-center items-center">
				<img src={activeContentUrl} alt="تصویر آموزشی دوره" className="h-full" />
			</div>
		);
	}
	const handlePlay = () => {
		if (isPlaying) {
			setIsPlaying(false);
		} else {
			setIsPlaying(true);
		}
	};
	// If Active Co ntent Was a Video
	return (
		<div>
			<video controls controlsList="nodownload" className="w-full h-full">
				<source src={activeContentUrl} />
				Your browser doesn't support HTML video.
			</video>
			{/* <ReactPlayer
				url="https://lezatkhayati.com/storage/hls/tamiz_doozi.jpg_2023-08-06-17:57:11/tamiz_doozi.jpg_2023-08-06-17:57:11_0_500.m3u8"
				playing={isPlaying}
				controls
			/>
			<button onClick={handlePlay}>play/pause</button> */}
		</div>
	);
};

export default Player;
