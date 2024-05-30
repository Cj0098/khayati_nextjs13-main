/*
    @desc: Journals List Page, Journals Category Id in Database = 2
*/

import Head from "next/head";

// Libraries
import axios from "axios";

// Components
import Journals from "components/Journals/Journals";

export default function Journalss({ journals }) {
	const envAppTitle = process.env.NEXT_PUBLIC_APP_TITLE;

	return (
		<>
			<Head>
				<title>{`ژورنال ها — ${envAppTitle}`}</title>
			</Head>

			<Journals />
		</>
	);
}
