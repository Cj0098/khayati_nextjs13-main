import Link from "components/common/Link/Link";

// Libraries
import { LazyLoadImage } from "react-lazy-load-image-component";

const Journal = ({ url, image, title }) => {
	return (
		<li className="border-4 p-2 rounded-xl hover:border-black">
			<Link href={url} className="block w-full h-full">
				{/* ——— <Journals Image> ——— */}
				<div className="mb-2">
					<LazyLoadImage src={image} alt={title} />
				</div>

				{/* ——— <Journals Title> ——— */}
				<div>
					<h3 className="text-center">{title}</h3>
				</div>
			</Link>
		</li>
	);
};
export default Journal;
