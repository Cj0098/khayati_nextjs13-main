// Libraries
import { LazyLoadImage } from "react-lazy-load-image-component";

// Components
import Section from "../Section/Section";

// CSS
import style from "./Application.module.scss";

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

const Application = (props) => {
	const envAppAppStore = process.env.NEXT_PUBLIC_APP_APPSTORE;
	const envAppGooglePlay = process.env.NEXT_PUBLIC_APP_GOOGLEPLAY;
	return (
		<Section>
			<div className={`flex-center py-4 ${style.background}`}>
				<div className="container">
					<div className={`gap-8 md:gap-12 lg:gap-16 ${style.wrapper}`}>
						<div>
							<div className="mb-3 text-center sm:mb-4 md:mb-6">
								<span className="text-xl font-bold md:text-2xl">
									اپلیکیشن لذت خیاطی رو نصب کن
								</span>
							</div>
							<div className="mb-3 text-center sm:mb-4 md:mb-6">
								<span className="text-xl font-medium md:text-2xl">
									و صدها دوره آموزشی رو آنلاین ببین
								</span>
							</div>
							<div className="flex justify-center gap-8 mb-3 sm:mb-4 md:mb-6">
								<ApplicationLink
									url={envAppGooglePlay}
									name="گوگل پلی"
									image={"/images/google-play.png"}
									imageAlt="گوگل پلی"
								/>
								<ApplicationLink
									url={envAppAppStore}
									name="اپ استور"
									image={"/images/apple.png"}
									imageAlt="اپ استور"
								/>
								<ApplicationLink
									url={"https://lezatkhayati.com/app-release.apk"}
									name="لینک مستقیم"
									image="/images/dl.png"
									imageAlt="لینک مستقیم"
								/>
							</div>
							<div className="text-center">
								<span className="text-xl font-medium md:text-2xl">
									لذت خیاطی را میتوانید در تمامی پلتفرم ها دنبال کنید
								</span>
							</div>
						</div>

						<div className="hidden sm:block">
							<LazyLoadImage src={"/images/iphone.png"} alt="آیفون" />
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
};

export default Application;
