import Link from "components/common/Link/Link";

// Libraries
import { LazyLoadImage } from "react-lazy-load-image-component";

// Components
import Rate from "components/common/Rate/Rate";

// Types
type Props = {
	image: string;
	title: string;
	rateScore: number;
	rateCount: number;
	url: string;
};

const Article = (props: Props) => {
	const { image, title, rateScore, rateCount, url } = props;

	return (
		<article className="flex flex-col justify-between gap-8 overflow-hidden bg-white shadow-md rounded-xl">
			{/* ——— <Top> ——— */}
			<div>
				{/* ——— <Image> ——— */}
				<div className="mb-2">
					<img src={image} alt={title} className="w-full" />
				</div>

				{/* ——— <Title> ——— */}
				<div className="text-center">
					<span>{title}</span>
				</div>
			</div>
			{/* ——— </Top> ——— */}

			{/* ——— <Bottom> ——— */}
			<div className="px-2 pb-3">
				<div className="flex flex-col items-center mb-4">
					{/* ——— <Rate Stars> ——— */}
					<div dir="ltr" className="flex mb-1">
						<Rate score={rateScore} />
					</div>

					{/* ——— <Rate Count> ——— */}
					<div className="flex">
						<span className="text-xs text-gray-500">({rateCount})</span>
					</div>
				</div>

				{/* ——— <Show Article Button> ——— */}
				<div className="flex justify-center">
					<Link
						href={url}
						className="block px-8 py-2 text-white duration-200 bg-green-500 hover:bg-green-600 rounded-3xl"
					>
						مشاهده
					</Link>
				</div>
			</div>
			{/* ——— </Bottom> ——— */}
		</article>
	);
};

export default Article;
