import Link from "components/common/Link/Link";

// Types
type Props = {
	url: string;
	image: string;
	title: string;
};

const Book = (props: Props) => {
	const { url, image, title } = props;

	return (
		<Link href={url} className="block duration-200 hover:bg-white rounded-xl">
			{/* ——— <Image> ——— */}
			<div>
				<img src={image} alt={title} className="w-full" />
			</div>

			{/* ——— <Title> ——— */}
			<div className="p-2 text-center sm:text-lg font-medium">
				<span>{title}</span>
			</div>
		</Link>
	);
};

export default Book;
