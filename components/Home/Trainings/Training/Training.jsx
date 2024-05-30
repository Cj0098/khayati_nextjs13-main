import Link from "components/common/Link/Link";

// Libraries
import { LazyLoadImage } from "react-lazy-load-image-component";

// Components
import Rate from "components/common/Rate/Rate";

// CSS
import style from "./Training.module.scss";

const Training = ({ url = "/", image, title, updateDate, teacher, score, scoreCount }) => (
	<li className={`${style.Training}`}>
		<Link
			href={url}
			className={`flex flex-col items-center sm:items-stretch sm:flex-row gap-2 sm:gap-4 py-4 hover:bg-white duration-200`}
		>
			<div className="aspect-square lg:w-52 sm:w-40 flex-center">
				<LazyLoadImage src={image} alt={title} className="object-contain" />
			</div>
			<div className="flex flex-col justify-around gap-2">
				<div>
					<h3 className="text-lg font-medium text-center sm:text-right">{title}</h3>
				</div>
				<div className="text-center sm:text-right">
					<span>آخرین بروزرسانی :</span>
					&nbsp;
					<span>{`${updateDate[0]}/${updateDate[1]}/${updateDate[2]}`}</span>
				</div>
				<div className="text-center sm:text-right">
					<span>مدرس :</span>
					&nbsp;
					<span>{teacher}</span>
				</div>
				<div className="flex gap-3">
					<div className="h-full">
						<span>{score}</span>
					</div>
					<div dir="ltr" className="h-full">
						<Rate score={score} />
					</div>
					<div className="h-full">
						<span>({scoreCount})</span>
					</div>
				</div>
			</div>
		</Link>
	</li>
);

export default Training;
