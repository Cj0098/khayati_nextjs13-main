import Link from "components/common/Link/Link";

// Libraries
import { LazyLoadImage } from "react-lazy-load-image-component";

// Components
import Section from "../Section/Section";

// CSS
import style from "./About.module.scss";

const About = (props) => {
	return (
		<section>
			<div style={{ background: "linear-gradient(180deg, #EEEFF4 0%, #FFFFFF 100%)" }}>
				<div className="container">
					<div className={`gap-4 lg:gap-16 ${style.wrapper}`}>
						<div className="text-center">
							<div className="mb-2">
								<span className="text-2xl font-bold lg:text-3xl">ناصر مقدم جو</span>
							</div>
							<div className="mb-2">
								<span className="text-xl font-medium lg:text-2xl">
									بنیانگذار و مدرس متد مقدم جو
								</span>
							</div>
							<div className="mb-3">
								<span className="text-xl font-medium lg:text-2xl">
									(روش قالب سازی اندام)
								</span>
							</div>
							<div
								className="p-2 mb-8 rounded-2xl"
								style={{
									background:
										"linear-gradient(232.69deg, #997FFF 9.95%, rgba(253, 132, 255, 0) 71.62%)",
									maxWidth: "400px",
								}}
							>
								<p className="font-medium text-justify lg:text-lg">
									اینجانب افتخار دارم اعلام کنم، از سال 1394 با تلاش شبانه روزی و
									مستمر و با برگزاری کلاسهای متعدد و متنوع در زمینه ی طراحی،
									الگوسازی و دوخت توانسته ام حدود 4000 نفرهنرجوی مشتاق در کلاسهای
									مجازی و حضوری به کارآفرینان کشور عزیزمان اضافه کنم.
								</p>
							</div>
							<div className="mb-4 flex-center">
								<Link
									href="/about"
									className="block bg-[#9980FF] text-white font-medium rounded-xl py-2 px-4 shadow-bsPrimary lg:text-lg"
								>
									درباره من
								</Link>
							</div>
						</div>
						<div>
							<LazyLoadImage
								src="/images/home-about-naser-moghadamjou.png"
								alt="ناصر مقدم جو"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
