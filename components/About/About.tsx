// Components
import MainContainer from "components/common/MainContainer/MainContainer";

// Libraries
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Pagination } from "swiper";
import { Autoplay } from "swiper";
import { v4 as uuid } from "uuid";

// CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import style from "./About.module.scss";
import Space from "components/common/Space/Space";
import Link from "next/link";

const swiperSlides = [
	{ imageUrl: "/images/about/grid-image-1.jpg" },
	{ imageUrl: "/images/about/grid-image-2.jpg" },
	{ imageUrl: "/images/about/grid-image-3.jpg" },
	{ imageUrl: "/images/about/grid-image-4.jpg" },
	{ imageUrl: "/images/about/grid-image-5.jpg" },
	{ imageUrl: "/images/about/grid-image-6.jpg" },
	{ imageUrl: "/images/about/grid-image-7.jpg" },
	{ imageUrl: "/images/about/grid-image-8.jpg" },
	{ imageUrl: "/images/about/grid-image-9.jpg" },
	{ imageUrl: "/images/about/grid-image-10.jpg" },
	{ imageUrl: "/images/about/grid-image-11.jpg" },
];

const gridImages = [
	{
		imageUrl: "/images/about/slider-slide-1.jpg",
		link: "/article/77/%D8%A8%D8%B1%DA%AF%D8%B2%D8%A7%D8%B1%DB%8C-%D8%A2%D9%85%D9%88%D8%B2%D8%B4-%D8%A8%D8%B1%D8%A7%DB%8C-%D9%86%D8%A7%D8%B4%D9%86%D9%88%D8%A7%DB%8C%D8%A7%D9%86",
	},
	{
		imageUrl: "/images/about/slider-slide-2.jpg",
		link: "/article/76/%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D9%87-%D9%86%D9%82%D8%B7%D9%87-%D8%B7%D9%84%D8%A7%DB%8C%DB%8C",
	},
	{
		imageUrl: "/images/about/slider-slide-3.jpg",
		link: "/article/81/%D8%A8%D8%B1%DA%AF%D8%B2%D8%A7%D8%B1%DB%8C-%DA%A9%D9%84%D8%A7%D8%B3-%D8%AD%D8%B6%D9%88%D8%B1%DB%8C",
	},
	{
		imageUrl: "/images/about/slider-slide-4.jpg",
		link: "/article/80/%D8%A8%D8%B1%DA%AF%D8%B2%D8%A7%D8%B1%DB%8C-%D9%87%D9%85%D8%A7%DB%8C%D8%B4-%D9%87%D8%A7%DB%8C-%D9%85%D8%AE%D8%AA%D9%84%D9%81-%D8%A8%D9%87-%D8%B5%D9%88%D8%B1%D8%AA-%D8%B1%D8%A7%DB%8C%DA%AF%D8%A7%D9%86",
	},
	{
		imageUrl: "/images/about/slider-slide-5.jpg",
		link: "/article/79/%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D9%87-%D8%AC%D8%A7%D9%85-%D8%AC%D9%85",
	},
	{
		imageUrl: "/images/about/slider-slide-6.jpg",
		link: "/article/78/%D8%A8%D8%B1%D9%86%D8%A7%D9%85%D9%87-%D8%B1%D8%A7%D8%AF%DB%8C%D9%88-%DA%AF%D9%81%D8%AA%DA%AF%D9%88",
	},
];

const About = () => {
	const appInstagram = process.env.NEXT_PUBLIC_APP_INSTAGRAM;
	const appYoutube = process.env.NEXT_PUBLIC_APP_YOUTUBE;
	const appAparat = process.env.NEXT_PUBLIC_APP_APARAT;
	const appGooglePlay = process.env.NEXT_PUBLIC_APP_GOOGLEPLAY;
	const appMobileNumber = process.env.NEXT_PUBLIC_APP_MOBILE_NUMBER;
	const appTelephoneNumber = process.env.NEXT_PUBLIC_APP_TELEPHONE_NUMBER;
	const FrontBaseUrl = process.env.NEXT_PUBLIC_FRONT;
	return (
		<MainContainer>
			{/* ——— <About> ——— */}
			<section className="mb-12 sm:mb-20">
				<div className={`gap-4 rounded-xl overflow-hidden ${style.AboutWrapper}`}>
					<div>
						<LazyLoadImage
							src={"/images/about-naser-moghadamjou.png"}
							alt="ناصر مقدم جو"
						/>
					</div>
					<div className="p-2 sm:p-4">
						<div className="mb-4 text-center">
							<span className="text-xl font-bold md:text-2xl lg:text-3xl">
								درباره لذت خیاطی :
							</span>
						</div>
						<div>
							<p className="font-medium text-justify lg:text-lg">
								آموزش خیاطی به صورت حرفه ای علاوه بر علاقه و استعداد ، نیازمند
								برنامه اموزشی دقیق و هدفمند می باشد که در آکادمی لذت خیاطی با آموزش
								های بازاری و کاربردی و با شعار « ما نمی خواهیم پشت چرخ خیاطی پیر
								بشیم. » به این هدف مهم پرداخته است. مدرس و بنیانگذار متد مقدم جو
								(روش قالب سازی اندام) استاد ناصر مقدم جو، با افتخار با تلاش شبانه
								روزی و مستمر از سال 1375 در زمینه دوخت ، طراحی مد ، الگوسازی و
								مدیریت تولید و مزون داری و با جذب بیش از 4000 هنرجو موفق و فعال در
								سراسر ایران و همچنین خارج از کشور قدمی هرچند کوچک در راستای
								اشتغالزایی و کارآفرینی برداشته است. الگوسازی مزونی و بازاری (حدود 16
								سال) و حدود 12 سال مدیر و سرپرست خط تولید شرکت ها و برندهای مطرح و
								بزرگی مانند اوتانا ، دوریتا ، گلپوشان ، ملل ، ژست ، اکسیژن ، ورست ،
								پانی ، مدا ، حدیث نو، تاج محل و مدیر عامل آکادمی لذت خیاطی از فعالیت
								های آقای مقدم جو می باشد و همچنین تدریس در شبکه جام جم (برنامه خانه
								مهر) و شبکه آموزش و همکاری و مصاحبه های متعدد با رادیو گفتگو در حوزه
								ی مشکلات پوشاک ، بخشی از رزومه ی موفق و موثر ایشان به شمار می رود.
								آموزش های نازک دوزی ، ضخیم دوزی ، الگوسازی ، لباس شب و عروس ، الگوی
								مادر ، مزون داری در فضای مجازی (ادمین اینستاگرام) ، ژورنال شناسی ،
								برشکاری ، آموزش یقه ، آموزش سایزبندی ، آموزش دوخت شلوار و مدیریت
								مزون و آموزش دامن ، بچگانه دوزی از دوره های آموزش خیاطی استاد مقدم
								جو برای خدمت رسانی به علاقمندان به این صنعت پولساز و هنر زیبا می
								باشند. ما میخواهیم از خیاطی پول زیادی به دست بیاوریم.
							</p>
						</div>
					</div>
				</div>
			</section>
			{/* ——— </About> ——— */}

			{/* ——— <Slider> ——— */}
			<div dir="ltr" className="w-full">
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
							slidesPerView: 3,
						},
					}}
					className="h-full"
				>
					{swiperSlides.map((slide) => (
						<SwiperSlide key={uuid()}>
							<div className="w-full h-full flex-center">
								<LazyLoadImage src={slide.imageUrl} alt="دست‌آورد" />
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			{/* ——— </Slider> ——— */}

			<Space height="5rem" />

			{/* ——— <Image Grid> ——— */}
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
				{gridImages.map((gridImage) => (
					<div key={uuid()} className="border border-black/20">
						<Link href={"https://lezatekhayati.com" + gridImage.link}>
							<LazyLoadImage src={gridImage.imageUrl} alt="دست‌آورد" />
						</Link>
					</div>
				))}
			</div>
			{/* ——— </Image Grid> ——— */}

			<Space height="5rem" />

			{/* ——— <Contact Us> ——— */}
			<section>
				<div className={`gap-4 ${style.ContactUsWrapper}`}>
					<div>
						<div className="mb-4">
							<span className="text-2xl font-medium">
								راه های ارتباطی با آموزشگاه لذت خیاطی :
							</span>
						</div>
						<div className="flex flex-col gap-3 mb-3">
							<p>آدرس : کرج - 45 متری گلشهر </p>
							<p>
								شماره تماس : <span dir="ltr">{appMobileNumber}</span> /{" "}
								<span dir="ltr">026-34612248</span> /
								<span dir="ltr">{appTelephoneNumber}</span>
							</p>
							<p>ساعات کاری 9 الی 6 عصر , پنجشنبه 9 الی 3 عصر</p>
							<p>
								آدرس پیج اینستاگرام :{" "}
								<a
									href={appInstagram}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:underline"
								>
									Lezatekhayati_moghadamjoo
								</a>
							</p>
							<p>
								کانال آپارات :{" "}
								<a
									href={appAparat}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:underline"
								>
									lezatekhayati
								</a>
							</p>
							<p>
								کانال یوتیوب :{" "}
								<a
									href={appYoutube}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:underline"
								>
									lezatekhayati
								</a>
							</p>
							<p>
								اپلیکیشن لذت خیاطی :{" "}
								<a
									href={appGooglePlay}
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-600 hover:underline"
								>
									لینک دانلود
								</a>
							</p>
							<p>
								عضو پیج لذت خیاطی شوید و از مطالب آموزشی که روزانه قرار داده می‌شود
								استفاده کنید. همچنین از تخفیف‌های ویژه ما به راحتی با خبر می‌شوید.
							</p>
						</div>
					</div>
					<div className="aspect-square">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d808.752777900248!2d50.93955482924501!3d35.82420308615015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x8893c06de58b2f32!2zMzXCsDQ5JzI3LjEiTiA1MMKwNTYnMjQuNCJF!5e0!3m2!1sen!2s!4v1661609302161!5m2!1sen!2s"
							width="100%"
							height="100%"
							style={{ border: "0" }}
							allowFullScreen={true}
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						></iframe>
					</div>
				</div>
			</section>
			{/* ——— </Contact Us> ——— */}
		</MainContainer>
	);
};

export default About;
