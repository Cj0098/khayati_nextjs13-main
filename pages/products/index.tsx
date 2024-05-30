import Head from "next/head";

// Components
import ProductCategories from "components/ProductCategories/ProductCategories";

export default function ProductCategoriess() {
	const appTitle = process.env.NEXT_PUBLIC_APP_TITLE;

	return (
		<>
			<Head key={"/products"}>
				<title>{`دسته‌بندی محصولات — ${appTitle}`}</title>
			</Head>

			<ProductCategories />
		</>
	);
}
