import Link from "components/common/Link/Link";

// Types
type Props = {
	url: string;
	title: string;
};

const Category = (props: Props) => {
	const { url, title } = props;

	return (
		<Link
			href={url}
			className="duration-200 bg-white rounded-xl aspect-square flex-center hover:shadow-xl"
		>
			<h2 className="text-lg">{title}</h2>
		</Link>
	);
};

export default Category;
