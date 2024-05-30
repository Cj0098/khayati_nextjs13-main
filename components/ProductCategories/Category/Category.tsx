import Link from "components/common/Link/Link";

// Types
type Props = {
	url: string;
	image: string;
	name: string;
};

const Category = (props: Props) => {
	const { url, image, name } = props;

	return (
		<Link href={url} className="block h-full">
			<div className="h-full items-center overflow-hidden duration-200 bg-white shadow rounded-xl hover:shadow-lg">
				{/* ——— <Category Image> ——— */}
				<div className="flex justify-center">
					<img src={image} alt={name} className={"max-h-96"} />
				</div>

				{/* ——— <Category Title> ——— */}
				<div className="p-2 text-center">
					<span className="text-lg">{name}</span>
				</div>
			</div>
		</Link>
	);
};

export default Category;
