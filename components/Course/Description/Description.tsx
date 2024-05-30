import React, { useState } from "react";

// Hooks
import useCourseQuery from "hooks/useCourseQuery";

// Icons
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";

// CSS
import style from "./Description.module.scss";
import Skeleton from "components/common/Skeleton/Skeleton";

// Types
type Props = {
	courseId: number;
	activeVideoId: number | false;
};

const Description = (props: Props) => {
	const { courseId, activeVideoId } = props;
	const course = useCourseQuery(courseId);

	const [readMore, setReadMore] = useState<boolean>(false);
	const [showDefaultDescription, setShowDefaultDescription] = useState<boolean>(false);

	console.log(course.data);

	if (course.data === undefined) {
		return (
			<div>
				<Skeleton width="100%" aspectRatio="5 / 1" borderRadius="0px 0px 4px 4px" />
			</div>
		);
	}

	const defaultDescription = course.data.description;
	const selectedContent = course.data.videos.find((video) => video.id === activeVideoId);
	const selectedContentDescription =
		selectedContent === undefined ? course.data.description : selectedContent.content;

	return (
		<section className="relative">
			<div
				className="px-8 pt-8"
				style={{
					background: "linear-gradient(180deg, #979797 0%, #FFFFFF 100%)",
				}}
			>
				<div className="flex flex-wrap justify-between mb-4 gap-4">
					<div>
						<h2 className="text-2xl font-bold">مباحث کلاس</h2>
					</div>
					<div>
						{activeVideoId !== false && (
							<button
								className="bg-white py-2 px-3 rounded"
								onClick={() => setShowDefaultDescription((c) => !c)}
							>
								{showDefaultDescription ? (
									<span className="text-red-600">مشاهده توضیحات درس</span>
								) : (
									<span className="text-[#2B27F6]">مشاهده توضیحات دوره</span>
								)}
							</button>
						)}
					</div>
				</div>
				<div
					className={`relative flex flex-col gap-3 overflow-hidden
					${readMore ? "pb-16" : ""}`}
					style={{
						height: `${readMore ? "auto" : "128px"}`,
					}}
				>
					<div
						className={`flex-center ${style.DescriptionReadMoreOverdrop}`}
						style={{
							background: `${
								readMore
									? "transparent"
									: "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)"
							}`,
						}}
					>
						{readMore ? (
							<button
								className="flex items-center text-gray-500"
								onClick={() => setReadMore(false)}
							>
								<span className="bg-green-600 text-white p-3 px-6 rounded-3xl flex opacity-80 shadow-md hover:opacity-100 ease-in-out duration-500">
									نمایش کمتر
									<i className="mt-1">
										<RiArrowDropUpLine />
									</i>
								</span>
							</button>
						) : (
							<button className="flex items-center" onClick={() => setReadMore(true)}>
								<span className="bg-green-600 p-3 text-white px-6 rounded-3xl flex opacity-80 shadow-md hover:opacity-100 ease-in-out duration-500">
									نمایش بیشتر{" "}
									<i className="mt-1">
										<RiArrowDropDownLine />
									</i>
								</span>
							</button>
						)}
					</div>

					{course.data.type === "pricy" && (
						<>
							{activeVideoId === false ? (
								<div
									dangerouslySetInnerHTML={{
										__html: defaultDescription,
									}}
								></div>
							) : (
								<div
									dangerouslySetInnerHTML={{
										__html: showDefaultDescription
											? defaultDescription
											: "برای مشاهده توضیحات درس به اپلیکیشن مراجعه کنید",
									}}
								></div>
							)}
						</>
					)}

					{course.data.type === "free" && (
						<>
							{activeVideoId === false ? (
								<div
									dangerouslySetInnerHTML={{
										__html: defaultDescription,
									}}
								></div>
							) : (
								<div
									dangerouslySetInnerHTML={{
										__html: showDefaultDescription
											? defaultDescription
											: selectedContentDescription,
									}}
								></div>
							)}
						</>
					)}
				</div>
			</div>
		</section>
	);
};

export default React.memo(Description);
