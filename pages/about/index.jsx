/*
	@url: /about
	@description: website about page
*/

import Head from "next/head";

// Components
import About from "components/About/About";

export default function Abou() {
	const appTitle = process.env.NEXT_PUBLIC_APP_TITLE;

	return (
		<>
			<Head>
				<title>{`درباره ما — ${appTitle}`}</title>
			</Head>

			<About />
		</>
	);
}
