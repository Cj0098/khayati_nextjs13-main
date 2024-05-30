// Context
import { useContext, useLayoutEffect } from "react";
import TokenContext from "context/token/TokenContext";

import { useRouter } from "next/router";

export default function Logout() {
	const router = useRouter();

	const { setToken } = useContext(TokenContext);
	useLayoutEffect(() => {
		setToken(false);
		router.push("/");

		// eslint-disable-next-line
	}, []);
}

export async function getServerSideProps({ req }) {
	const { cookies } = req;
	if (!cookies.token) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
}
