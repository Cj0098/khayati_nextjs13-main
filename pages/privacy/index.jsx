/*
	@url: /about
	@description: website about page
*/

import Head from "next/head";

// Components
import Privacy from "components/Privacy/Privacy";

export default function Abou() {
	const envAppTitle = process.env.NEXT_PUBLIC_APP_TITLE;

	return (
		<>
			<Head>
				<title>{`قوانین ما — ${envAppTitle}`}</title>
			</Head>

			<Privacy />
		</>
	);
}
