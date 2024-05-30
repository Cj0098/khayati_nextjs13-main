import Link from "components/common/Link/Link";

// Libraries
import { LazyLoadImage } from "react-lazy-load-image-component";

// CSS
import style from "./Footer.module.scss";

const Head = ({ text }) => (
	<div className="mb-8">
		<span className="text-xl">{text}</span>
	</div>
);

const SkillTrainingLogo = ({ image, imageAlt }) => (
	<div className="p-2 bg-[#D9D9D9] rounded-xl">
		<LazyLoadImage src={image} alt={imageAlt} />
	</div>
);

const ApplicationLink = ({ url, name, image, imageAlt }) => (
	<a
		href={url}
		target="_blank"
		rel="noreferrer"
		className="flex items-center w-44 justify-center gap-2 py-1 pl-2 pr-3 bg-background rounded-xl text-[#0B1B70]"
		style={{ boxShadow: "3px 7px 11px -1px rgba(0, 0, 0, 0.25)" }}
	>
		<div>
			<span className="md:text-lg">{name}</span>
		</div>
		<div className="w-12 flex-center">
			<LazyLoadImage src={image} alt={imageAlt} />
		</div>
	</a>
);

const SocialMedia = ({ url = "#", image, imageAlt }) => (
	<li>
		<a href={url} target="_blank" rel="noreferrer" className="block w-10 ">
			<LazyLoadImage src={image} alt={imageAlt} />
		</a>
	</li>
);

const Footer = (props) => {
	const envAppGooglePlay = process.env.NEXT_PUBLIC_APP_GOOGLEPLAY;
	const envAppAppStore = process.env.NEXT_PUBLIC_APP_APPSTORE;
	const envAppInstagram = process.env.NEXT_PUBLIC_APP_INSTAGRAM;
	const envAppYoutube = process.env.NEXT_PUBLIC_APP_YOUTUBE;
	const envAppAparat = process.env.NEXT_PUBLIC_APP_APARAT;

	return (
		<footer className="bg-[#535353] text-white py-8">
			<div className="container">
				<div className={`gap-12 ${style.wrapper}`}>
					{/* Skill Training */}
					<div>
						<Head text="مهارت آموزی آنلاین" />

						<div>
							<div className="mb-6">
								<p className="text-sm">
									آکادمی لذت خیاطی با متد مقدم جو (روش قالب سازی اندام) شامل آموزش
									هایی به صورت متفاوت و کاربردی می باشد و با ارائه ی خدمات آموزشی
									و مشاوره و فروش محصولات خیاطی در کیفیت صنعت خیاطی کوشا بوده و
									کیفیت آموزش را چندین برابر نموده است. با اپلیکیشن و سایت لذت
									خیاطی یکبار آموزش اصولی ببنید و برای آینده سرمایه گذاری کنید.
								</p>
							</div>
							<div className="flex gap-4">
								<SkillTrainingLogo
									image="/images/footer-moghadamjou-logo.png"
									imageAlt="مقدم جو"
								/>
								<SkillTrainingLogo
									image="/images/footer-electronic-symbol-logo.png"
									imageAlt="نماد الکترونیک"
								/>
								<SkillTrainingLogo
									image="/images/footer-samandehi-logo.png"
									imageAlt="لوگو ساماندهی"
								/>
							</div>
						</div>
					</div>

					{/* Contact us */}
					<div>
						<Head text="لینک های مفید" />

						<div>
							<ul className="flex flex-col gap-4 text-sm">
								<li>
									<Link href="/">خانه</Link>
								</li>
								<li>
									<Link href="/about">درباره ما</Link>
								</li>
								<li>
									<Link href="/privacy">قوانین و حریم خصوصی</Link>
								</li>
								<li>
									<Link href="/courses/pricy">کلاس ها</Link>
								</li>
								<li>
									<Link href="/courses/free">آموزش های رایگان</Link>
								</li>
								<li>
									<Link href="/products">محصولات</Link>
								</li>
							</ul>
						</div>
					</div>

					{/* Application */}
					<div>
						<Head text="اپلیکیشن" />

						<div className="flex flex-col items-start gap-4">
							<ApplicationLink
								url={envAppGooglePlay}
								name="گوگل پلی"
								image="/images/google-play.png"
								imageAlt="گوگل پلی"
							/>
							<ApplicationLink
								url={envAppAppStore}
								name="اپ استور"
								image="/images/apple.png"
								imageAlt="اپ استور"
							/>
							<ApplicationLink
								url="https://lezatkhayati.com/app-release.apk"
								name="لینک مستقیم"
								image="/images/dl.png"
								imageAlt="لینک مستقیم"
							/>
						</div>
					</div>

					{/* Social Media */}
					<div>
						<Head text="لذت خیاطی را در شبکه های اجتماعی دنبال کنید" />

						<div>
							<ul className="flex flex-wrap justify-center gap-4">
								<SocialMedia
									url={envAppInstagram}
									image="/images/instagram.png"
									imageAlt="اینستاگرام"
								/>
								<SocialMedia
									url={envAppYoutube}
									image="/images/youtube.png"
									imageAlt="یوتیوب"
								/>
								<SocialMedia
									url={envAppAparat}
									image="/images/aparat.png"
									imageAlt="آپارات"
								/>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
