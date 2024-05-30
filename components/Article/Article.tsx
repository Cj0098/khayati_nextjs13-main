import Head from "next/head";
import Link from "components/common/Link/Link";

// Libraries
import { LazyLoadImage } from "react-lazy-load-image-component";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

// Hooks
import useArticleQuery from "hooks/useArticleQuery";

// Context
import { useContext } from "react";
import TokenContext from "context/token/TokenContext";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Pagination } from "swiper";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Components
import MainContainer from "components/common/MainContainer/MainContainer";
import Skeleton from "components/common/Skeleton/Skeleton";
import Space from "components/common/Space/Space";
import Bookmark from "components/Article/Bookmark/Bookmark";
import Rate from "components/common/Rate/Rate";
import Comments from "components/Article/Comments/Comments";
import Commenting from "components/Article/Commenting/Commenting";

// Types
type Props = {
	articleId: number;
};

const Article = (props: Props) => {
	const { articleId } = props;
	const appTitle = process.env.NEXT_PUBLIC_APP_TITLE;
	const article = useArticleQuery(articleId);
	const { token: loggedInUserToken } = useContext(TokenContext);

	const reactSlickCarouselSettings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 6,
		slidesToScroll: 3,
		arrows: false,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 3,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 2,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<>
			<Head>
				<title>{`${
					article.data === undefined ? "مقاله" : article.data.name
				} — ${appTitle}`}</title>
			</Head>

			<MainContainer>
				{/* ——— <Article> ——— */}
				<article>
					{/* ——— <Top> ——— */}
					<div className="mb-12">
						{/* ——— <Article Image> ——— */}
						{article.data === undefined ? (
							<div className="flex-center">
								<Skeleton className="w-full max-w-sm" aspectRatio="1 / 1" />
							</div>
						) : (
							<div className="flex-center">
								<img
									src={article.data.img}
									alt={article.data.name}
									className="w-full max-w-sm"
								/>
							</div>
						)}

						<Space height="1rem" />

						{/* ——— <Title> ——— */}
						{article.data === undefined ? (
							<div className="flex-center">
								<Skeleton className="w-full max-w-[12rem] h-6" />
							</div>
						) : (
							<div>
								<h1 className="text-2xl font-bold text-center sm:text-3xl">
									{article.data.name}
								</h1>
							</div>
						)}

						<Space height="1rem" />

						{/* ——— <Boomark & Rate> ——— */}
						<div className="flex flex-wrap justify-center gap-x-8 gap-y-4 sm:justify-between">
							{/* ——— <Bookmark> (Only LoggedInUser) ——— */}
							{loggedInUserToken ? (
								<Bookmark
									loggedInUserToken={loggedInUserToken}
									articleId={articleId}
									isBookmarked={article.data?.isBookmarked}
								/>
							) : (
								<div></div>
							)}

							{/* ——— <Rate> ——— */}
							{article.data === undefined ? (
								<div>
									<Skeleton className="w-40 h-6" />
								</div>
							) : (
								<div className="flex items-center gap-2">
									<div className="flex" dir="ltr">
										<Rate score={article.data.reviewsRating} />
									</div>
									<div className="">
										<span className="font-bold">
											{article.data.reviewsRating}
										</span>{" "}
										<span className="text-gray-400">
											از {article.data.reviews} رأی
										</span>
									</div>
								</div>
							)}
						</div>
						{/* ——— </Boomark & Rate> ——— */}
					</div>
					{/* ——— </Top> ——— */}

					{/* ——— <Content> ——— */}
					{article.data === undefined ? (
						<div className="flex flex-col gap-2">
							<Skeleton className="w-full h-4" />
							<Skeleton className="w-full h-4" />
							<Skeleton className="w-full h-4" />
							<Skeleton className="w-1/3 h-4" />
						</div>
					) : (
						<div dangerouslySetInnerHTML={{ __html: article.data.content }}></div>
					)}
				</article>
				{/* ——— </Article> ——— */}

				{/* ——— <Comments> ——— */}
				<Comments articleId={articleId} />

				<Space height="3rem" />

				{/* ——— <Commenting> ——— */}
				{loggedInUserToken === false ? (
					<div className="text-center">
						<Link
							href="/authentication"
							className="text-gray-500 hover:text-black hover:underline"
						>
							برای ارسال نظر وارد شوید
						</Link>
					</div>
				) : (
					<Commenting articleId={articleId} loggedInUserToken={loggedInUserToken} />
				)}

				{article.data === undefined ? null : (
					<div
						className={` p-5 ${"col-span-12"}  relative items-center z-0 w-full mb-6  border-2 border-background-light mt-5 shadow-md dark:border-background-dark rounded-2xl gap-4 pb-9 px-3 group`}
					>
						{/* <Slider {...reactSlickCarouselSettings}>
							{article.data.gallery.map((galleyItem, index) => (
								<div
									key={index}
									className="flex flex-col items-center justify-center p-2 gap pb-9 sm:pb-2"
								>
									<img
										src={galleyItem.img}
										alt={article.data.name}
										className="mx-auto max-w-full max-h-[350px]"
									/>
								</div>
							))}

							
						</Slider> */}

						<Swiper
							slidesPerView={1}
							spaceBetween={16}
							navigation={true}
							pagination={{ dynamicBullets: true, clickable: true }}
							autoplay={{
								delay: 4000,
								disableOnInteraction: false,
								pauseOnMouseEnter: true,
							}}
							modules={[Navigation, Pagination, Autoplay]}
							breakpoints={{
								// when window width is >= 640px
								576: {
									slidesPerView: 2,
								},

								768: {
									slidesPerView: 2,
								},

								1024: {
									slidesPerView: 6,
								},
							}}
							className="h-full"
						>
							{article.data.gallery.map((galleyItem, index) => (
								<SwiperSlide key={index}>
									<div className="w-full h-full flex-center">
										<LazyLoadImage
											src={galleyItem.img}
											alt="دست‌آورد"
											width="100%"
											height="100%"
										/>
									</div>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				)}
			</MainContainer>
		</>
	);
};

export default Article;
