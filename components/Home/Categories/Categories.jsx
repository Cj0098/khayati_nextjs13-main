import React from "react";
import Link from "components/common/Link/Link";

// Libraries
import { LazyLoadImage } from "react-lazy-load-image-component";

// Components
import Section from "../Section/Section";
import SectionHead from "../Section/SectionHead";

const Category = ({ url = "/", image, imageAlt, color, text }) => (
	<li>
		<Link href={url} className="block duration-200 hover:scale-110">
			<div className="w-[100px] h-[100px] rounded-full shadow-bsPrimary flex-center mb-4 mx-auto">
				<LazyLoadImage src={image} alt={imageAlt} />
			</div>
			<div className="text-center">
				<span style={{ color: color }}>{text}</span>
			</div>
		</Link>
	</li>
);

const Categories = (props) => {
	return (
		<Section>
			<div className="container">
				<SectionHead text="دسته ها" />

				<div className="">
					<ul className="flex flex-wrap items-center justify-around gap-6">
						<Category
							url="/music"
							image="/images/home-categories-music.png"
							color="#EA3EF7"
							text="موسیقی"
						/>
						<Category
							url="/courses/free"
							image="/images/home-categories-reading.png"
							color="#1986E4"
							text="آموزش های رایگان"
						/>
						<Category
							url="/products"
							image="/images/home-categories-mannequin.png"
							color="#21CBEF"
							text="محصولات"
						/>
						<Category
							url="/articles"
							image="/images/home-categories-model.png"
							color="#92E516"
							text="مقالات"
						/>
						<Category
							url="/courses/pricy"
							image="/images/home-categories-information.png"
							color="#EA9F1D"
							text="دوره ها"
						/>
						<Category
							url="/chat"
							image="/images/home-categories-conference.png"
							color="#E81D46"
							text="پرسش و پاسخ عمومی"
						/>
						<Category
							url="/articles/1/news"
							image="/images/home-categories-radio.png"
							color="#E81691"
							text="اخبار لذت خیاطی"
						/>
					</ul>
				</div>
			</div>
		</Section>
	);
};

export default React.memo(Categories);
