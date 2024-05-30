import Link from "components/common/Link/Link";

// Libraries
import Space from "components/common/Space/Space";

// Utils
import formatNumber from "utils/formatNumber";

// Types
type Props = {
	url: string;
	image: string;
	title: string;
	price: number;
};

const Product = (props: Props) => {
	const { url, image, title, price } = props;

	return (
		<Link
			href={url}
			className="flex flex-col max-w-xs p-2 bg-white rounded-2xl hover:shadow-lg"
		>
			{/* ——— <Image> ——— */}
			<div className="flex-center">
				<img src={image} alt={title} />
			</div>

			<Space height="1rem" />

			{/* ——— <Title> ——— */}
			<div className="text-center">
				<h2>{title}</h2>
			</div>

			<Space height="1.5rem" />

			{/* ——— <Price> ——— */}
			<div className="mt-auto text-center">
				<span>{formatNumber(price)} تومان</span>
			</div>
		</Link>
	);
};

export default Product;
