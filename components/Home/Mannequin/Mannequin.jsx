import Link from "components/common/Link/Link";

// Libraries
import { LazyLoadImage } from "react-lazy-load-image-component";

// Hooks
import useViewportWidth from "hooks/useViewportWidth";

// Components
import Section from "../Section/Section";

// CSS
import style from "./Mannequin.module.scss";

const Mannequin = (props) => {
	const { viewportWidth } = useViewportWidth();

	return (
		<Section>
			<div className="container xl:pt-20">
				<div className={`px-4 sm:px-8 shadow-bsPrimary rounded-xl ${style.mannequin}`}>
					<div className="relative">
						{viewportWidth < 576 ? (
							<LazyLoadImage
								src={"/images/home-mannequin-mannequin-horizontal.png"}
								alt="مانکن"
								className={style.mannequinImage}
							/>
						) : (
							<LazyLoadImage
								src={"/images/home-mannequin-mannequin-vertical.png"}
								alt="مانکن"
								className={style.mannequinImage}
							/>
						)}
					</div>
					<div className="flex-1 py-4 text-2xl sm:py-8 sm:text-3xl flex-center">
						<div className="flex flex-col items-center gap-4 sm:gap-8">
							<div className="text-center">
								<span className="font-bold">خرازی لذت خیاطی</span>
							</div>

							<div className="text-center">
								<span className="font-medium">
									فروش انواع ملزومات متنوع با بالاترین درجه کیفیت و قیمت مناسب
								</span>
							</div>
							<div className="flex-center">
								<Link
									href="/products"
									className="block text-white bg-[#5C7DAE] hover:bg-[#7692bc] py-3 px-5 rounded-2xl text-xl sm:text-2xl"
								>
									ورود به فروشگاه
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Section>
	);
};

export default Mannequin;
