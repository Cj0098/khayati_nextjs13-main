import React, { useState } from "react";
import Link from "components/common/Link/Link";
import ArticlesByCategory from "components/ArticlesByCategory/ArticlesByCategory";

// Libraries
import axios from "axios";
import { v4 as uuid } from "uuid";
import { useQuery } from "@tanstack/react-query";

// Components
import Section from "../Section/Section";
import TrainingSkeleton from "./TrainingSkeleton/TrainingSkeleton";
import Training from "./Training/Training";

// CSS
import style from "./Trainings.module.scss";

const TrainingsHeadButton = ({ text, active = false, onClick = () => {} }) => (
	<button
		className={`relative text-2xl font-bold pb-4 ${
			active ? style.TrainingsHeadButtonActive : ""
		}`}
		onClick={onClick}
	>
		{/*  */}
		{text}
	</button>
);
const TrainingsBodyButton = ({ text, active = false, onClick = () => {} }) => (
	<button
		className={`relative pb-2 ${active ? style.TrainingsBodyButtonActive : ""}`}
		onClick={onClick}
	>
		{/*  */}
		{text}
	</button>
);

const Trainings = (props) => {
	const [trainingType, setTrainingType] = useState("free"); // free | pricy
	const [trainingSortBy, setTrainingSortBy] = useState("popular"); // popular | hits | latest

	const fetchTrainings = (et, es) =>
		axios.post(`/theme/courses/${et}/${es}`).then((res) => res.data.data);
	const trainings = useQuery(
		["Home", "Trainings", trainingType, trainingSortBy],
		() => fetchTrainings(trainingType, trainingSortBy),
		{
			retry: true,
			staleTime: 30 * 1000,
		}
	);

	return (
		<Section>
			<div className="container">
				<h6 className="text-[25px]">آخرین مقالات آموزش خیاطی</h6>
				<ArticlesByCategory categoryId="14" />
				<div className="px-4 py-3 sm:px-8 sm:py-6 shadow-bsSecondary sm:shadow-bsPrimary rounded-xl">
					{/* Top Part */}
					<div className="flex gap-8">
						<TrainingsHeadButton
							text="آموزش های رایگان"
							active={trainingType === "free"}
							onClick={() => setTrainingType("free")}
						/>
						<TrainingsHeadButton
							text="آموزش های ویژه"
							active={trainingType === "pricy"}
							onClick={() => setTrainingType("pricy")}
						/>
					</div>

					<hr className="h-0.5 bg-[#090909] mb-6" />

					{/* Bottom Part */}
					<div>
						<div className="flex gap-4 mb-4">
							<TrainingsBodyButton
								text="محبوب ترین ها"
								active={trainingSortBy === "popular"}
								onClick={() => setTrainingSortBy("popular")}
							/>
							<TrainingsBodyButton
								text="جدید ترین ها"
								active={trainingSortBy === "latest"}
								onClick={() => setTrainingSortBy("latest")}
							/>
							<TrainingsBodyButton
								text="پربازدید ترین ها"
								active={trainingSortBy === "hits"}
								onClick={() => setTrainingSortBy("hits")}
							/>
						</div>
						<div className="mb-4">
							<ul>
								{trainings.isLoading && (
									<>
										<TrainingSkeleton />
										<TrainingSkeleton />
										<TrainingSkeleton />
									</>
								)}
								{!trainings.isLoading &&
									trainings.data.map((training) => (
										<Training
											key={uuid()}
											url={`/course/${training.id}/${training.slug}`}
											image={training.img}
											title={training.name}
											updateDate={training.update}
											teacher={training.teacher}
											score={training.reviewsRating}
											scoreCount={training.reviews}
										/>
									))}
							</ul>
						</div>
						<div className="flex justify-center sm:justify-end">
							<Link
								href={`nonsense
								${trainingType === "free" ? "/courses/free" : "/courses/pricy"}`}
								className="px-4 py-3 shadow-bsSecondary sm:shadow-bsPrimary rounded-xl hover:shadow-bsPrimaryInset"
							>
								مشاهده همه
							</Link>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
};

export default React.memo(Trainings);
