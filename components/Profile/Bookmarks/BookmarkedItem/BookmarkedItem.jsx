// Libraries
import { LazyLoadImage } from "react-lazy-load-image-component";

const BookmarkedItem = ({ image, title, url }) => {
	return (
		<li className="flex justify-between">
			<div className="flex items-center gap-2">
				{/* ——— <Bookmarked Item Image> ——— */}
				<div className="w-9 h-9">
					<LazyLoadImage src={image} alt={title} className="max-w-full max-h-full" />
				</div>

				{/* ——— <Bookmarked Item Image> ——— */}
				<div>
					<span>{title}</span>
				</div>
			</div>

			<div>
				<a
					href={url}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-block px-2 py-1 text-white rounded bg-rose-500 hover:bg-rose-600"
				>
					مشاهده
				</a>
			</div>
		</li>
	);
};

export default BookmarkedItem;
