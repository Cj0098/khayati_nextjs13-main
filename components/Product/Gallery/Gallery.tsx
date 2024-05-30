import { useState } from "react";

// Libraries
import { v4 as uuid } from "uuid";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper";
import { Pagination } from "swiper";

// Components
import Skeleton from "components/common/Skeleton/Skeleton";

// Icons
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";

// CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Types
import type { ProductGalleryImage } from "../Product";
type Props = {
	images: ProductGalleryImage[] | undefined;
};

const PrevButton = () => {
	const swiper = useSwiper();

	return (
		<button
			disabled={swiper.isBeginning}
			onClick={() => swiper.slidePrev()}
			className="text-3xl text-sky-400 hover:text-sky-600 disabled:opacity-50"
		>
			<MdKeyboardArrowRight />
		</button>
	);
};
const NextButton = () => {
	const swiper = useSwiper();

	return (
		<button
			disabled={swiper.isEnd}
			onClick={() => swiper.slideNext()}
			className="text-3xl text-sky-400 hover:text-sky-600 disabled:opacity-50"
		>
			<MdKeyboardArrowLeft />
		</button>
	);
};

const Gallery = (props: Props) => {
	const { images } = props;

	const [rerender, setRerender] = useState(false);
	const foreRerender = () => setRerender((c) => !c);

	if (images === undefined) {
		return <Skeleton width="100%" aspectRatio="1 / 1" style={{ maxWidth: "20rem" }} />;
	}

	return (
		<div className="w-full max-w-sm overflow-hidden rounded aspect-square">
			<Swiper
				navigation={{
					enabled: true,
					prevEl: null,
					nextEl: null,
				}}
				pagination={{
					dynamicBullets: true,
				}}
				modules={[Navigation, Pagination]}
				onSlideChange={() => foreRerender()}
			>
				{/* ——— <Slides> ——— */}
				{images.map(({ url }) => (
					<SwiperSlide key={uuid()}>
						<img src={url} alt="تصویر محصول" />
					</SwiperSlide>
				))}

				{/* ——— <Next/Prev Buttons> ——— */}
				<div
					className="absolute z-[2] top-1/2 w-full h-max flex justify-between"
					style={{ transform: "translateY(-50%)" }}
				>
					<PrevButton />
					<NextButton />
				</div>
			</Swiper>
		</div>
	);
};

export default Gallery;
