import Link from "components/common/Link/Link";

// Libraries
import Slider from "react-slick";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuid } from "uuid";
import { LazyLoadImage } from "react-lazy-load-image-component";

// Components
import Section from "../Section/Section";
import SectionHead from "../Section/SectionHead";
import Skeleton from "../../../components/common/Skeleton/Skeleton";

// Icons
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

// CSS
import style from "./Classes.module.scss";

const SliderNextArrow = ({ onClick }) => (
	<button
		className={`w-7 h-7 sm:w-10 sm:h-10 rounded-full flex-center ${style.ClassesSliderArrow} right-0`}
		onClick={onClick}
	>
		<i className="text-base text-white sm:text-2xl">
			<IoIosArrowForward />
		</i>
	</button>
);

const SliderPreviousArrow = ({ onClick }) => (
	<button
		className={`w-7 h-7 sm:w-10 sm:h-10 rounded-full flex-center ${style.ClassesSliderArrow} left-0`}
		onClick={onClick}
	>
		<i className="text-base text-white sm:text-2xl">
			<IoIosArrowBack />
		</i>
	</button>
);

const SliderSlide = ({
	image,
	imageAlt = "خیاطی",
	background,
	title,
	description,
	updateDate,
	url,
}) => (
	<div dir="rtl" className="mx-2">
		<div className="rounded-[64px] overflow-hidden">
			{/* Top part */}
			<div
				className={`px-4 sm:px-8 ${style.ClassesSliderSlideTopPart}`}
				style={{ background: background }}
			>
				<div className="relative flex items-center ">
					<LazyLoadImage src={image} alt={imageAlt} />
				</div>
				<div
					className="py-2 text-xl font-bold text-center text-white sm:text-2xl flex-center lg:text-4xl"
					style={{ textShadow: "0px 4px 4px #000000" }}
				>
					<div>
						<span className="block mb-2" style={{ maxWidth: "400px" }}>
							{title}
						</span>
					</div>
				</div>
			</div>

			{/* Bottom part */}
			<div className={`p-4 sm:p-8 bg-white ${style.ClassesSliderSlideBottomPart}`}>
				<div>
					<div className="mb-3">
						<p className="text-xl font-medium">{description}</p>
					</div>
					<div className="mb-3 text-sm font-medium text-[#073e10]">
						<span>آخرین بروزرسانی :</span>
						&nbsp;
						<span>{`${updateDate[0]}/${updateDate[1]}/${updateDate[2]}`}</span>
					</div>
				</div>
				<div className="flex items-end justify-center">
					<Link href={url} className="text-white rounded-xl bg-[#3D39FF] py-2 px-4">
						اطلاعات بیشتر
					</Link>
				</div>
			</div>
		</div>
	</div>
);

const Classes = (props) => {
	const fetchClassesSlides = () =>
		axios.post("/theme/pinnedcourses").then((res) => res.data.data);
	const classesSlides = useQuery(["Home", "Classes", "Slides"], fetchClassesSlides, {
		retry: true,
		staleTime: Infinity,
	});

	const sliderSettings = {
		dots: true,
		infinite: true,
		speed: 400,
		autoplay: true,
		autoplaySpeed: 7000,
		pauseOnHover: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: <SliderNextArrow />,
		prevArrow: <SliderPreviousArrow />,
	};

	return (
		<Section>
			<div className="container">
				<Link href="/courses/pricy">
					<SectionHead text="کلاس ها" />
				</Link>
				<div className="grid grid-cols-1 justify-items-center">
					<div className={`${style.ClassesSliderBox}`}>
						<Slider {...sliderSettings}>
							{classesSlides.isLoading ? (
								<Skeleton aspectRatio="10 / 3" />
							) : (
								classesSlides.data.map(
									({ id, name, poster, gradient, excerpt, update, slug }) => (
										<SliderSlide
											key={uuid()}
											title={name}
											image={poster}
											imageAlt={name}
											background={gradient}
											description={excerpt}
											updateDate={update}
											url={`/course/${id}/${slug}`}
										/>
									)
								)
							)}
						</Slider>
					</div>
				</div>
			</div>
		</Section>
	);
};

export default Classes;
