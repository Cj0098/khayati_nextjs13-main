import React from "react";

// Hooks
import useCourseQuery from "hooks/useCourseQuery";

// Components
import DetailSkeleton from "./DetailSkeleton/DetailSkeleton";

// CSS
import style from "./Detail.module.scss";

// Types
type Props = {
	courseId: number;
};

const Detail = (props: Props) => {
	const { courseId } = props;
	const course = useCourseQuery(courseId);
	const appMobileNumber = process.env.NEXT_PUBLIC_APP_MOBILE_NUMBER;
	const appPhoneNumber = process.env.NEXT_PUBLIC_APP_TELEPHONE_NUMBER;

	// If Course data was not Loaded yet!
	if (course.data === undefined) {
		return <DetailSkeleton />;
	}

	return (
		<div className="bg-[#C7C7C7] py-6 px-2 sm:px-4 rounded-tl-xl rounded-tr-xl">
			<div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
				{/* <Title> */}
				<div>
					<h1 className="text-2xl font-bold">{course.data.name}</h1>
				</div>
				{/* </Title> */}

				<div className="flex flex-wrap gap-4">
					{/* <Course Total Videos Count> */}
					<div className="p-4 bg-white rounded-2xl flex-center">
						<div className="flex flex-col items-center text-lg font-bold sm:text-xl">
							<div>
								<span>{course.data.totalVideos}</span>
							</div>
							<div>
								<span>جلسه</span>
							</div>
						</div>
					</div>

					{/* <Course Price> */}
					<div className="p-4 bg-white rounded-2xl flex-center">
						{course.data.type === "free" && (
							<div className={`text-xl sm:text-2xl font-bold ${style.Price}`}>
								<span>رایگان!</span>
							</div>
						)}
						{course.data.type === "pricy" && (
							<div className="flex flex-col gap-1">
								<div
									className={`flex flex-col text-lg sm:text-xl font-bold ${style.Price}`}
								>
									<div className="text-center">
										<span>برای ثبت نام</span>
									</div>
									<div className="text-center">
										<span>تماس بگیرید</span>
									</div>
								</div>
								<div className="flex-center" dir="ltr">
									<span className="text-lg sm:text-xl">{appPhoneNumber}</span>
								</div>
								<div className="flex-center">
									<span className="text-lg sm:text-xl">{appMobileNumber}</span>
								</div>
							</div>
						)}
					</div>
				</div>
				{/* </Detail> */}
			</div>
		</div>
	);
};

export default React.memo(Detail);
