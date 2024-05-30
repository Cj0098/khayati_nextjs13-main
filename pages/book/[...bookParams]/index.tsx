/*
	@url: /book/${bookId}
	@description: shows the intended book, if no books data with that id available then
					redirect user to the '/books' page to choose wisely from books.
*/

import Head from "next/head";

// Components
import Book from "components/Book/Book";

// Types
import { GetServerSideProps } from "next";
type ServerSideProps = {
	bookId: string;
};

export default function Bookk(props: ServerSideProps) {
	return <Book bookId={Number(props.bookId)} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { query } = context;
	if (query.bookParams === undefined) {
		return {
			redirect: {
				destination: "/books",
				permanent: false,
			},
		};
	}

	const bookId = query.bookParams[0];
	return {
		props: {
			bookId: bookId,
		},
	};
};
