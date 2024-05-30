import Head from "next/head";

// Components
import ProductsByCategory from "components/ProductsByCategory/ProductsByCategory";

// Types
import { GetServerSideProps } from "next";
type ServerSideProps = {
	categoryId: string;
};

export default function ProductsByCategoryy(props: ServerSideProps) {
	const appTitle = process.env.NEXT_PUBLIC_APP_TITLE;

	return (
		<>
			<Head>
				<title>{`محصولات — ${appTitle}`}</title>
			</Head>

			<ProductsByCategory categoryId={props.categoryId} />
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { query } = context;
	if (query.productsParams === undefined) {
		return {
			redirect: {
				destination: "/products",
				permanent: false,
			},
		};
	}

	const categoryId = query.productsParams[0];

	return {
		props: {
			categoryId: categoryId,
		},
	};
};
