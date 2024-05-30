import React from "react";
import Link from "components/common/Link/Link";

// Hooks
import useUserQuery from "hooks/useUserQuery";

// Context
import { useContext } from "react";
import TokenContext from "context/token/TokenContext";

// Libraries
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

// Utils
import formatNumber from "utils/formatNumber";

// Components
import Space from "components/common/Space/Space";
import Gallery from "./Gallery/Gallery";
import Description from "./Description/Description";
import Label from "./Label/Label";

// Types
export type ProductGalleryImage = {
	id: number;
	url: string;
};
type ProductT = {
	content: string;
	gallery: ProductGalleryImage[];
	id: number;
	img: string;
	name: string;
	price: string;
	slug: string;
};
type Props = {
	productId: number;
};

const Product = (props: Props) => {
	const { productId } = props;
	const apiBaseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
	const { token: loggedInUserToken } = useContext(TokenContext);
	const user = useUserQuery();

	const fetchProduct = (productId: number) =>
		axios.get(`/products/single/${productId}`).then((res) => res.data.data);
	const product = useQuery<ProductT>(["Product", `${productId}`], () => fetchProduct(productId), {
		retry: true,
	});

	return (
		<main className="py-12 sm:py-24">
			<div className="container">
				<div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
					{/* <Product Image> */}
					<Gallery images={product.data?.gallery} />

					{/* <Description> */}
					<Description
						productName={product.data?.name}
						productDescription={product.data?.content}
					/>
				</div>

				<Space height="2rem" />

				{/* <Label> */}
				<Label
					productPrice={
						product.data === undefined ? undefined : Number(product.data.price)
					}
				/>
			</div>
		</main>
	);
};

export default Product;
