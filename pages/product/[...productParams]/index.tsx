/*
	# Single Product Page

	@url : '/product/{productId}'
	@description: shows a single product for buying
*/

import React from "react";

// Components
import Product from "components/Product/Product";

// Type
import { GetServerSideProps } from "next";
type ServerSideProps = {
	productId: string;
};

export default function Productt(props: ServerSideProps) {
	return <Product productId={Number(props.productId)} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { query } = context;
	if (query.productParams === undefined) {
		return {
			redirect: {
				destination: "/products",
				permanent: false,
			},
		};
	}

	const productId = query.productParams[0];
	return {
		props: {
			productId: productId,
		},
	};
};
