/* 
	@url: /articles/${articleCategory}
	@description: shows articles of a specific category
*/

// Components
import ArticlesByCategory from "components/ArticlesByCategory/ArticlesByCategory";

// Types
import type { GetServerSideProps } from "next";
type ServerSideProps = {
	articlesCategoryId: string;
};

export default function ArticlesByCategor(props: ServerSideProps) {
	const { articlesCategoryId } = props;

	return <ArticlesByCategory categoryId={Number(articlesCategoryId)} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { query } = context;
	if (query.articlesParams === undefined) {
		return {
			redirect: {
				destination: "/articles",
				permanent: false,
			},
		};
	}

	// Fetch Articles Based On Category
	const articlesCategoryId = query.articlesParams[0];

	return {
		props: {
			articlesCategoryId: articlesCategoryId,
		},
	};
};
