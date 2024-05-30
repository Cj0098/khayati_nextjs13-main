import React from "react";
import Head from "next/head";

// Components
import Music from "components/Music/Music";

export default function Musicc() {
	const appTitle = process.env.NEXT_PUBLIC_APP_TITLE;

	return (
		<>
			<Head>
				<title>{`موسیقی — ${appTitle}`}</title>
			</Head>

			<Music />
		</>
	);
}
