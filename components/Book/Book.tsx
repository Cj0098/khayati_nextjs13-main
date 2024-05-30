import Head from "next/head";

// Libraries
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Components
import Space from "components/common/Space/Space";
import Skeleton from "components/common/Skeleton/Skeleton";

// Icons
import { FiDownload } from "react-icons/fi";

// Types
type Book = {
	description: string;
	id: number;
	img: string;
	link: string;
	name: string;
};
type Props = {
	bookId: number;
};

const Book = (props: Props) => {
	const { bookId } = props;
	const appTitle = process.env.NEXT_PUBLIC_APP_TITLE;

	const fetchBook = (bookId: number) =>
		axios.get(`s/books/single/${bookId}`).then((res) => res.data.data);
	const book = useQuery<Book>(["Book", bookId.toString()], () => fetchBook(bookId), {
		retry: true,
	});

	console.log(book.data);

	return (
		<>
			<Head>
				<title>
					{`${book.data === undefined ? "کتاب" : book.data.name} — ${appTitle}`}
				</title>
			</Head>

			<main className="py-12 sm:py-20">
				<div className="container">
					{book.data === undefined ? (
						<>
							{/* <Book Image Skeleton> */}
							<div className="flex-center">
								<Skeleton
									width="100%"
									aspectRatio="1 / 1"
									style={{ maxWidth: "35rem" }}
								/>
							</div>

							<Space height="1rem" />

							{/* <Book Name Skeleton> */}
							<div className="flex-center">
								<Skeleton
									width="100%"
									height="2rem"
									style={{ maxWidth: "10rem" }}
								/>
							</div>

							<Space height="1rem" />

							{/* <Book Description Skeleton> */}
							<div className="flex-center">
								<Skeleton
									width="100%"
									height="2rem"
									style={{ maxWidth: "30rem" }}
								/>
							</div>
						</>
					) : (
						<>
							{/* <Book Image> */}
							<div className="mx-auto mb-3" style={{ maxWidth: "40rem" }}>
								<img src={book.data.img} alt={book.data.name} className="mx-auto" />
							</div>

							{/* <Book Title> */}
							<div className="text-center">
								<h2 className="text-2xl font-bold">{book.data.name}</h2>
							</div>

							<Space height="1rem" />

							{/* <Book Download Button> */}
							<div className="flex-center">
								<a
									href={book.data.link}
									target="_blank"
									rel="noreferrer"
									download
									className="flex items-center gap-2 px-3 py-2 rounded bg-lime-400 hover:bg-green-500 hover:text-white"
								>
									<span>دریافت کتاب</span>

									<i>
										<FiDownload />
									</i>
								</a>
							</div>

							<Space height="1rem" />

							{/* <Book Description> */}
							<div dangerouslySetInnerHTML={{ __html: book.data.description }}></div>
						</>
					)}
				</div>
			</main>
		</>
	);
};

export default Book;
