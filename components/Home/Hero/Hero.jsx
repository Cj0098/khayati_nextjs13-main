import Link from "components/common/Link/Link";

// Libraries
import Slider from "react-slick";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { useQuery } from "@tanstack/react-query";
import { LazyLoadImage } from "react-lazy-load-image-component";

// Components
import Section from "../Section/Section";
import Skeleton from "../../../components/common/Skeleton/Skeleton";

// Icons
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

// CSS
import style from "./Hero.module.scss";

const SliderNextArrow = ({ onClick }) => (
	<button
		className={`w-7 h-7 sm:w-10 sm:h-10 rounded-full flex-center ${style.HeroSliderArrow} right-0`}
		onClick={onClick}
	>
		<i className="text-base text-white sm:text-2xl">
			<IoIosArrowForward />
		</i>
	</button>
);

const SliderPreviousArrow = ({ onClick }) => (
	<button
		className={`w-7 h-7 sm:w-10 sm:h-10 rounded-full flex-center ${style.HeroSliderArrow} left-0`}
		onClick={onClick}
	>
		<i className="text-base text-white sm:text-2xl">
			<IoIosArrowBack />
		</i>
	</button>
);

const SliderSlide = ({ url = "/", image, imageAlt }) => (
	<Link href={url} className="block rounded-[46px] overflow-hidden mx-2">
		<LazyLoadImage src={image} alt={imageAlt} className="mx-auto" />
	</Link>
);

const Hero = (props) => {
	const storage = process.env.NEXT_PUBLIC_BACKEND_STORAGE;

	const fetchSliderImages = () =>
		axios.post("/theme/TopRightSlider").then((res) => res.data.data);
	const sliderSlides = useQuery(["Home", "Hero", "Slider"], fetchSliderImages, {
		retry: true,
		staleTime: Infinity,
	});

	const sliderSettings = {
		dots: true,
		infinite: true,
		speed: 400,
		autoplay: true,
		autoplaySpeed: 5000,
		pauseOnHover: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: <SliderNextArrow />,
		prevArrow: <SliderPreviousArrow />,
		height: 500,
	};

	return (
		<Section>
			<div className="container">
				<div className={`${style.Hero}`}>
					{/* Slider */}
					<div>
						<Slider {...sliderSettings}>
							{sliderSlides.isLoading
								? [...Array(3).keys()].map(() => (
										<Skeleton key={uuid()} width="100%" aspectRatio="3 / 1" />
								  ))
								: sliderSlides.data.map(({ url, name, img }) => (
										<SliderSlide
											key={uuid()}
											url={url}
											image={img}
											imageAlt={name}
										/>
								  ))}
						</Slider>
					</div>

					{/* Site Guide */}
					<div className="flex flex-col items-center p-4 shadow-bsPrimary">
						<img
							src={storage + "/uploads/مقدم-PNG-1_2023-01-11-17:34:30.png"}
							height="300"
							width="300"
							alt=""
						/>
						کاربر گرامی به وبسایت لذت خیاطی خوش آمدید ، برای آشنایی با تمامی امکانات
						سایت و اپلیکیشن لذت خیاطی از طریق لینک زیر اقدام نمایید
						<div className="lg:py-8 sm:py-1">
							<Link
								href="/guide"
								className="block px-4 py-2 duration-200 shadow-bsPrimary rounded-2xl text-primary hover:shadow-bsPrimaryInset"
							>
								<span>راهنمای سایت</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
};

export default Hero;
