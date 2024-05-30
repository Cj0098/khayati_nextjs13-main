/*
	@url: /article/${articeId}
	@description: shows the intended article
*/

// Components
import Article from "components/Article/Article";

// Types
import { GetServerSideProps } from "next";
type ServerSideProps = {
	articleId: string;
};

export default function Articl(props: ServerSideProps) {
	const { articleId } = props;

	return <Article articleId={Number(articleId)} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { query } = context;
	if (query.articleParams === undefined) {
		return {
			redirect: {
				destination: "/articles",
				permanent: false,
			},
		};
	}

	const articleId = query.articleParams[0];

	return {
		props: {
			articleId: articleId,
		},
	};
};
