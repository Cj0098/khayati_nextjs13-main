/*
	@url: /books
	@description: shows the list of all books
*/

import Head from "next/head";

// Components
import Books from "components/Books/Books";

export default function Bookss() {
	const appTitle = process.env.NEXT_PUBLIC_APP_TITLE;

	return (
		<>
			<Head>
				<title>{`کتاب ها — ${appTitle}`}</title>
			</Head>

			<Books />
		</>
	);
}
