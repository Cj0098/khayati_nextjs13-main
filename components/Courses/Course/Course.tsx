import Link from "components/common/Link/Link";

// Components
import Rate from "components/common/Rate/Rate";

// Types
type Props = {
	url: string;
	image: string;
	title: string;
	rateScore: number;
	rateCount: number;
};

const Course = (props: Props) => {
	const { image, title, rateScore, rateCount, url } = props;

	return (
		<article
			className="flex flex-col justify-between gap-8 overflow-hidden bg-white rounded-xl"
			style={{ boxShadow: "4px 6px 4px rgba(0, 0, 0, 0.25)" }}
		>
			{/* ——— <Top> ——— */}
			<div>
				{/* ——— <Image> ——— */}
				<div className="mb-2 flex justify-center">
					<img src={image} alt={title} />
				</div>

				{/* ——— <Title> ——— */}
				<div>
					<Link href={url}>
						<h2 className="text-center">{title}</h2>
					</Link>
				</div>
			</div>
			{/* ——— </Top> ——— */}

			{/* ——— <Bottom> ——— */}
			<div className="px-2 pb-3">
				{/* ——— <Rate> ——— */}
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

				{/* ——— <Show Course Button> ——— */}
				<div className="text-center">
					<Link
						href={url}
						className="inline-block px-8 py-2 text-white duration-200 rounded-full bg-emerald-500 hover:bg-emerald-600"
					>
						مشاهده
					</Link>
				</div>
			</div>
			{/* ——— </Bottom> ——— */}
		</article>
	);
};

export default Course;
