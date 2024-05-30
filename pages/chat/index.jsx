import Head from "next/head";

// Components
import Chat from "components/Chat/Chat";

export default function Cha({ loggedInUserToken }) {
	const appTitle = process.env.NEXT_PUBLIC_APP_TITLE;

	return (
		<>
			<Head>
				<title>{`گفت و گو — ${appTitle}`}</title>
			</Head>

			<main className="py-8 sm:py-12">
				<div className="container">
					<Chat loggedInUserToken={loggedInUserToken} />
				</div>
			</main>
		</>
	);
}

export async function getServerSideProps({ req }) {
	const { cookies } = req;

	// If user was not logged in : redirect to authentication page
	if (!cookies.token) {
		return {
			redirect: {
				destination: "/authentication",
				permanent: false,
			},
		};
	}

	return {
		props: {
			loggedInUserToken: cookies.token,
		},
	};
}
