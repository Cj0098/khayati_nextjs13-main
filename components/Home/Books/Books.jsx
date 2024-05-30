import { useState } from "react";
import Link from "components/common/Link/Link";

// Libraries
import axios from "axios";
import { v4 as uuid } from "uuid";
import { useQuery } from "@tanstack/react-query";
import { LazyLoadImage } from "react-lazy-load-image-component";

// Components
import Section from "../Section/Section";
import SectionHead from "../Section/SectionHead";
import Rate from "../../../components/common/Rate/Rate";
import Skeleton from "../../../components/common/Skeleton/Skeleton";

// CSS
import style from "./Books.module.scss";

const BooksSortButton = ({ text, active = false, onClick = () => {} }) => (
	<button
		className={`relative pb-2 ${active ? style.booksSortButtonActive : ""}`}
		onClick={onClick}
	>
		{/*  */}
		{text}
	</button>
);

const Book = ({ url = "/", image, imageAlt, title }) => (
	<li>
		<Link href={url} className="block duration-200 hover:bg-white rounded-xl">
			{/* ——— <Image> ———  */}
			<div className="flex justify-center">
				<LazyLoadImage src={image} alt={imageAlt} className="w-full" />
			</div>

			{/* ——— <Title> ———  */}
			<div className="mb-1 text-center p-2">
				<span>{title}</span>
			</div>
		</Link>
	</li>
);

const Books = (props) => {
	const [booksSortType, setBooksSortType] = useState("popular");
	const fetchBooks = (st) => axios.post(`/theme/books/${st}`).then((res) => res.data.data);
	const books = useQuery(["Home", "Books", booksSortType], () => fetchBooks(booksSortType), {
		retry: true,
		staleTime: 60 * 1000,
	});

	return (
		<Section>
			<div className="container">
				<SectionHead text="پیشنهاد کتاب" />

				<div className="flex gap-4 mb-6">
					<BooksSortButton
						text="محبوب ترین ها"
						active={booksSortType === "popular"}
						onClick={() => setBooksSortType("popular")}
					/>
					<BooksSortButton
						text="جدید ترین ها"
						active={booksSortType === "latest"}
						onClick={() => setBooksSortType("latest")}
					/>
					<BooksSortButton
						text="پربازدید ترین ها"
						active={booksSortType === "hits"}
						onClick={() => setBooksSortType("hits")}
					/>
				</div>

				<div>
					<ul className={`${style.booksBox} gap-8`}>
						{books.isLoading ? (
							<li>
								<div>
									<div className="mb-2">
										<Skeleton aspectRatio="10 / 4" />
									</div>
									<div className="mb-2 flex-center">
										<Skeleton width="50%" height="25px" />
									</div>
									<div className="flex-center">
										<Skeleton width="80%" height="25px" />
									</div>
								</div>
							</li>
						) : (
							books.data.map(({ id, img, name, reviewsrating, reviews }) => (
								<Book
									key={uuid()}
									url={`/book/${id}`}
									image={img}
									imageAlt={name}
									title={name}
									point={reviewsrating}
									commentCount={reviews}
								/>
							))
						)}
					</ul>
				</div>
			</div>
		</Section>
	);
};

export default Books;
