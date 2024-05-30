/*
	@url: /articles
	@description: Shows articles categories
*/

import Head from "next/head";

// Components
import ArticleCategories from "components/ArticleCategories/ArticleCategories";

export default function Articless() {
	const appTitle = process.env.NEXT_PUBLIC_APP_TITLE;

	return (
		<>
			<Head>
				<title>{`دسته بندی مقالات — ${appTitle}`}</title>
			</Head>

			<ArticleCategories />
		</>
	);
}
