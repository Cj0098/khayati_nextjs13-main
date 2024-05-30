// Libraries
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Components
import Skeleton from "components/common/Skeleton/Skeleton";
import Book from "components/Books/Book/Book";

// Type
type Book = {
	description: string;
	id: number;
	img: string;
	link: string;
	name: string;
};

const Books = () => {
	const fetchBooks = () => axios.get("/books/archive").then((res) => res.data.data);
	const books = useQuery<Book[]>(["Books"], fetchBooks, { retry: true });

	return (
		<main className="py-12 sm:py-20">
			<div className="container">
				{books.data === undefined ? (
					<div
						className="grid gap-6"
						style={{ gridTemplateColumns: "repeat(auto-fit, minmax(1px, 280px))" }}
					>
						<Skeleton aspectRatio="1 / 1" />
						<Skeleton aspectRatio="1 / 1" />
						<Skeleton aspectRatio="1 / 1" />
					</div>
				) : (
					<div
						className="grid gap-6"
						style={{ gridTemplateColumns: "repeat(auto-fill, minmax(1px, 300px))" }}
					>
						{books.data.map((book) => (
							<Book
								key={`/books|Book-${book.id}`}
								url={`/book/${book.id}`}
								image={book.img}
								title={book.name}
							/>
						))}
					</div>
				)}
			</div>
		</main>
	);
};

export default Books;
